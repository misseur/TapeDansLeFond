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
                if (!($app['User']->isAuth($app, $req)))
                    return $app->json('Unthorized', 401);
            };
        });

        $app['loadUser'] = $app->protect(function () {
            return function (Request $req, Application $app) {
                $user_id = $req->attributes->get('user', null);

                if ($user_id == null)
                    return $app->json('User Id must be provided', 400);

                $user = $app['UserSvc']->getUser($user_id);

                if ($user == null)
                    return $app->json('User not found', 404);

                $req->attributes->set('user', $user);
            };
        });
    }
}