<?php
/**
 * Created by PhpStorm.
 * User: benoit-xavierhouvet
 * Date: 29/06/2017
 * Time: 10:27
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

class CompagnyController implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

        $controllers->post('/invite/{player}/team/{team}', [$this, 'inviteToTeam'])
            ->before($app['isAuth']())
            ->before($app['loadUser']())
        ;


        $app['cors-enabled']($controllers, ['allowOrigin' => '*']);
        return $controllers;
    }

    public function inviteToTeam(Application $app, Request $req, User $user, User $player, Team $team)
    {
        
        $message = $app['mailerSvc']->getMessage(
            '[Tape dans le fond] Invitation a la team de ' . $user->getName(),
            $user->getEmail(),
            $player->getEmail()
        );
        $message = $app['mailerSvc']->setTeamInvitationBody($message, ['bloub' => 'bloub']);
        $result = $app['mailerSvc']->sendMessage($message);

        return $app->json("ok", 200);
    }

}