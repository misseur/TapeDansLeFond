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
                $token = $req->headers->get('token');
                $expire = $req->headers->get('expire');
                $id = $req->headers->get('id');
                $expire = \DateTime::createFromFormat('Y-m-d H-m-s', $expire);
                $now = new \DateTime();
                $now = $now->format('Y-m-d H-m-s');
                if ($expire <= $now)
                    return $app->json('Unauthorized', 401);
                $user = $app['UserSvc']->getUser($id);
                $req->attributes->set('user', $user);
                if ($user->getToken() != $token)
                    return $app->json('Unauthorized', 401);
            };
        });
    }
}
