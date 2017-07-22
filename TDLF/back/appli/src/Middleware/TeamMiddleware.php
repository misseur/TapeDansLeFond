<?php

namespace TDLF\Middleware;

use Silex\Application;

use Pimple\Container;
use Pimple\ServiceProviderInterface;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TeamMiddleware implements ServiceProviderInterface
{
    public function register(Container $app)
    {
        $app['loadTeam'] = $app->protect(function () {
            return function (Request $req, Application $app) {
                $team_id = $req->attributes->get('team', null);

                if ($team_id == null)
                    return $app->json('Team Id must be provided', 400);

                $team = $app['TeamSvc']->getUser($team_id);

                if ($team == null)
                    return $app->json('User not found', 404);

                $req->attributes->set('team', $team);
            };
        });
    }
}