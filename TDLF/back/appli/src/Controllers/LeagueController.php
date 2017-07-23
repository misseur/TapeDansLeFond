<?php
/**
 * Created by PhpStorm.
 * User: benoit-xavierhouvet
 * Date: 23/07/2017
 * Time: 02:24
 */

namespace TDLF\Controllers;

use Silex\Application;
use Silex\Api\ControllerProviderInterface;
use Silex\ControllerCollection;

class LeagueController implements ControllerProviderInterface
{
    public function connect(Application $app) {
        $controllers = $app['controllers_factory'];
        $controllers->post('/league/associate', [$this, 'associateTeamToLeague'])
            ->before($app['isAuth']());

        $app['cors-enabled']($controllers, ['allowOrigin' => '*']);

        return $controllers;
    }

    public function associateTeamToLeague(Application $app, Request $req, User $user) {
        $team = $req->get('team');
        $league = $req->get('league');
        if (empty($team) || empty($league))
            return $app->json("Paramètre manquant", 404);
        $league = $app['LeagueSvc']->getLeague($league);
        $team = $app['TeamSvc']->getLeague($team);
        $league->getTeams()->add($team);
        $app['flush']($league);
        $app['flush']($team);
        return ($app->json($league, 200));
    }

}