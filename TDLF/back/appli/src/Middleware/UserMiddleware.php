<?php

namespace TDLF\Middleware;

use Silex\Application;

use Pimple\Container;
use Pimple\ServiceProviderInterface;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class UserMiddleware implements ServiceProviderInterface
{
    public function register(Container $app)
    {
        $app['Hello'] = $app->protect(function ($name) {
            return function (Request $req, Application $app) use ($name) {
                return $app->json(
                    "Hello {$name}",
                    Response::HTTP_BAD_REQUEST
                );
            };
        });
    }
}