<?php
/**
 * Created by PhpStorm.
 * User: benoit-xavierhouvet
 * Date: 05/07/2017
 * Time: 02:18
 */

namespace TDLF\Controllers;

use Silex\Application;
use Silex\Api\ControllerProviderInterface;
use Silex\ControllerCollection;
use TDLF\Entity\Team;
use TDLF\Entity\User;
use TDLF\Controllers\UserController;

use Symfony\Component\HttpFoundation\Request;

use TDLF\Entity;
use TDLF\Controllers;


class TeamController implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

        $controllers->post('/team/create', [$this, 'addTeam'])
            ->before($app['isAuth']());

        $controllers->post('/team/player', [$this, 'haveTeamPlayer'])
            ->before($app['isAuth']());

        $app['cors-enabled']($controllers, ['allowOrigin' => '*']);
        return $controllers;
    }

    public function addTeam(Application $app, Request $req, User $user) {
        $name = $req->get('name');
        $this->createTeam($app, $name, $user);
    }

    public function createTeam(Application $app, $name, $user){
        $team = new Team();
        $team->setName($name);
        $team->setCreator($user);
        $app['entityManager']->persist($team);
        $app['entityManager']->flush();
        $entreprise = $user->getCompagny();
        $addteam = $entreprise->getTeams()->add($team);
        $app['entityManager']->persist($entreprise);
        $app['entityManager']->flush();
        return $team;
    }

    public function haveTeamPlayer(Application $app, Request $req, User $user) {
        $entreprise = $user->getCompagny();
        $teams = $entreprise->getTeams();
        //var_dump($teams->toArray());
        return $app->json($this->tojson($teams), 200);
    }

    public function tojson($teams) {
        $result = array();
        $i = 0;
        foreach ($teams as $team) {
            $tmp = array();
            $tmp['id'] = $team->getId();
            $tmp['name'] = $team->getName();
            $tmp['creator'] = $team->getCreator();
            $tmp['player'] = $team->getPlayer();
            $result[$i] = $tmp;
            $i++;
        }
        return $result;
    }
}