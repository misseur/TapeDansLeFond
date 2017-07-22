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

        $controllers->get('/team/player', [$this, 'haveTeamPlayer'])
            ->before($app['isAuth']());

        $controllers->post('/team/addplayer', [$this, 'associatePlayer'])
            ->before($app['isAuth']());

        $controllers->get('/team/{id}', [$this, 'getTeam'])
            ->before($app['isAuth']());

        $app['cors-enabled']($controllers, ['allowOrigin' => '*']);
        return $controllers;
    }

    public function getTeam(Application $app, User $user, $id) {
        return $app->json($app['TeamSvc']->getTeam($id), 200);
    }

    public function addTeam(Application $app, Request $req, User $user) {
        $name = $req->get('name');
        //$this->createTeam($app, $name, $user);
        return $app->json($this->createTeam($app, $name, $user), 200);
    }

    public function createTeam(Application $app, $name, $user){
        $team = new Team();
        $team->setName($name);
        $team->setCreator($user);
        $app['entityManager']->persist($team);
        $app['entityManager']->flush();
        $user->getTeams()->add($team);
        $app['entityManager']->persist($user);
        $app['entityManager']->flush();
        return $team;
    }

    public function associatePlayer(Application $app, Request $req, User $user) {
        if ($user->getCompany() == NULL)
            return $app->json("User doesn't have a company", 401);
        $teamId = $req->get('id');
        $team = $app['entityManager']->find("TDLF\Entity\Team", $teamId);
        $adminUser = $team->getCreator();
        if ($user->getCompany() != $adminUser->getCompany())
            return $app->json("User isn't in the same company", 401);
        $nbrPlayer = 0;
        $players = $team->getPlayers();
        foreach ($players as $player) {
            $nbrPlayer++;
        }
        if ($nbrPlayer < 2) {
            $user->getTeams()->add($team);
            $app['entityManager']->persist($user);
            $app['entityManager']->flush();
            return $app->json($team, 200);
        }
        else
            return $app->json("Team have already 2 players", 401);
    }

    public function haveTeamPlayer(Application $app, Request $req, User $user) {
        $teams = $user->getTeams();
        return $app->json($this->tojson($teams), 200);
    }

    public function tojson($teams) {
        $result = [];
        $i = 0;
        foreach ($teams as $team) {
            $tmp = [];
            $tmp['id'] = $team->getId();
            $tmp['name'] = $team->getName();
            $tmp['creator'] = $team->getCreator();
            $tmp['player'] = $team->getPlayers();
            $result[$i] = $tmp;
            $i++;
        }
        return $result;
    }
}