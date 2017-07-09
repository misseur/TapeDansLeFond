<?php

namespace TDLF\Middleware;

use Silex\Application;

use Pimple\Container;
use Pimple\ServiceProviderInterface;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class CompagnyMiddleware implements ServiceProviderInterface
{
    public function register(Container $app)
    {
        $app['getCompagny'] = $app->protect(function () {
            return function (Request $req, Application $app) {
                $id = $req->attributes->get('id', null);
                if ($id == null)
                    return $app->json('Id must be provided', 400);

                $compagny = $app['CompagnySvc']->getCompagny($id);

                if ($compagny == null)
                    return $app->json('Compagny not found', 404);

                $req->attributes->set('compagny', $compagny);
                $req->attributes->remove('id');
            };
        });
    }
}