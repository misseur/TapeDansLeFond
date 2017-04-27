<?php

namespace TDLF;

use Silex;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

class Application extends Silex\Application
{
    public function __construct()
    {
        parent::__construct();

        /*
        ** TODO: gestion environnement prod/dev
        */
        $isDevMode = false;

        $app['debug'] = true;

        $this
            ->register(new Silex\Provider\ServiceControllerServiceProvider())
            ->register(new Silex\Provider\HttpFragmentServiceProvider())
            ->registerMiddleware()
            ->registerRoutes()
            ->registerEvent()
            ->registerDb($isDevMode);
    }

    protected function registerRoutes()
    {
        // Recherche tous les controllers pour les loader dans $this
        foreach (glob(__DIR__ . '/Controllers/*.php') as $controller) {
            $controllerName = pathinfo($controller)['filename'];
            $className = "\\TDLF\\Controllers\\{$controllerName}";

            // Si la class existe et qu'elle herite bien de l'interface d'un controlleur, on l'ajoute
            if (class_exists($className)
                    && in_array('Silex\Api\ControllerProviderInterface', class_implements($className))) {
                $this[$controllerName] = function () use ($className) {
                    return new $className();
                };
                $this->mount('/', $this[$controllerName]);
            }
        }

        return $this;
    }

    protected function registerEvent()
    {
        $this->before(function (Request $request) {
            if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
                $data = json_decode($request->getContent(), true);
                $request->request->replace(is_array($data) ? $data : []);
            }
        });

        return $this;
    }

    protected function registerMiddleware()
    {
        // Recherche tous les middleware pour les loader dans $this
        foreach (glob(__DIR__ . '/Middleware/*.php') as $middleware) {
            $middleware = pathinfo($middleware)['filename'];
            $className = "\\TDLF\\Middleware\\{$middleware}";

            if (class_exists($className)
                    && in_array('Pimple\ServiceProviderInterface', class_implements($className))) {
                $this->register(new $className());
            }
        }

        return $this;
    }

    protected function registerDb($isDevMode)
    {
        $connection = [
            'dbname'   => 'tdlf_bdd',
            'user'     => 'bx',
            'password' => 'toto',
            'host'     => 'db',
            'driver'   => 'pdo_mysql'
        ];

        $config = Setup::createAnnotationMetadataConfiguration(
            [ __DIR__ . "/Entity" ],
            $isDevMode
        );

        $this['entityManager'] = function ($app) use ($connection, $config) {
            return EntityManager::create($connection, $config);
        };

        return $this;
    }

}
