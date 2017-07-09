<?php

namespace TDLF\Middleware;

use Silex\Application;

use Pimple\Container;
use Pimple\ServiceProviderInterface;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthMiddleware implements ServiceProviderInterface
{
    public function register(Container $app)
    {
        $app['isAuth'] = $app->protect(function () {
            return function (Request $req, Application $app) {
                $expire = $req->get('expire');
                $token = $req->get('token');
                $id = $req->get('id');
                $expire = \DateTime::createFromFormat('Y-m-d H-m-s', $expire);
                $now = new \DateTime();
                $now = $now->format('Y-m-d H-m-s');
                if ($expire <= $now)
                    return $app->json('Unthorized', 401);
                $user = $app['UserSvc']->getUser($id);
                var_dump($id);
                $req->attributes->set('user', $user);
                if ($user->getToken() != $token)
                    return $app->json('Unthorized', 401);
            };
        });
    }
}
