<?php

namespace TDLF;

use Silex;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use JDesrosiers\Silex\Provider\CorsServiceProvider;

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
        $isDevMode = true;

        $app['debug'] = true;

        $this
            ->register(new Silex\Provider\ServiceControllerServiceProvider())
            ->register(new Silex\Provider\HttpFragmentServiceProvider())
            ->registerMiddleware()
            ->registerCors()
            ->registerRoutes()
            ->registerEvent()
            ->registerDb($isDevMode)
            ->registerRepository()
            ->registerMailer()
            ->registerService()
        ;
    }

    protected function registerCors()
    {
        $this->register(new CorsServiceProvider(), [
            "cors.allowOrigin" => "*"
        ]);

        return $this;
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

    protected function registerRepository()
    {
        // Recherche tous les controllers pour les loader dans $this
        foreach (glob(__DIR__ . '/Repository/*.php') as $repository) {
            $repositoryName = pathinfo($repository)['filename'];
            $className = "\\TDLF\\Repository\\{$repositoryName}";

            // Si la class existe et qu'elle herite bien de l'interface d'un controlleur, on l'ajoute
            if (class_exists($className)
                && in_array('Doctrine\Common\Persistence\ObjectRepository', class_implements($className))) {
                $app = $this;
                $entityName = str_replace('Repository', '', $repositoryName);
                $entityClassName = "TDLF\\Entity\\{$entityName}";
                $this[$entityName] = function () use ($className, $app, $entityClassName) {
                    return new $className($app['entityManager'], $app['entityManager']->getClassMetadata($entityClassName));
                };


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
            'driver'   => 'pdo_mysql',
            'driverOptions' => array(
             1002 => 'SET NAMES utf8'
    )

        ];

        $config = Setup::createAnnotationMetadataConfiguration(
            [ __DIR__ . "/Entity" ],
            $isDevMode
        );

        $app = $this;

        $this['meta'] = function () use ($isDevMode) {
            return Setup::createAnnotationMetadataConfiguration(
                [ __DIR__ . "/Entity" ],
                $isDevMode
            );
        };

        $this['entityManager'] = function ($app) use ($connection, $app) {
            return EntityManager::create($connection, $app['meta']);
        };

        return $this;
    }

    protected function registerMailer()
    {
        $this->register(new Silex\Provider\SwiftmailerServiceProvider());

        $option = [
            'host' => '127.0.0.1',
            'port' => '1025'
        ];

        $this['swiftmailer.options'] = $option;
        $this['swiftmailer.use_spool'] = !($this['debug']);

        return $this;
    }

    protected function registerService()
    {
        $this['UserSvc'] = function ($app) {
            return new \TDLF\Services\UserService($app);
        };

        $this['CompanySvc'] = function ($app) {
            return new \TDLF\Services\CompanyService($app);
        };

        $this['TeamSvc'] = function ($app) {
            return new \TDLF\Services\TeamService($app);
        };

        $this['flush'] = function ($app) {
          return function ($entity) use ($app) {
              $app['entityManager']->persist($entity);
              $app['entityManager']->flush();
          };
        };

        $this['mailerSvc'] = function ($app) {
            return new \TDLF\Services\MailManager($app);
        };

        return $this;
    }
}
