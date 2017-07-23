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
use TDLF\Entity\NotificationInviteTeam;
use TDLF\Entity\NotificationInviteCompany;
use TDLF\Entity\NotificationDate;
use TDLF\Entity\Notification;
use TDLF\Controllers\UserController;

use Symfony\Component\HttpFoundation\Request;

use TDLF\Entity;
use TDLF\Controllers;

class InvitationController implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

        $controllers->post('/invite/{player}/team/{team}', [$this, 'inviteToTeam'])
            ->before($app['isAuth']())
            ->before($app['loadUser']())
            ->before($app['loadTeam']())
        ;

        $controllers->post('/invite/email', [$this, 'inviteToCompany'])
            ->before($app['isAuth']())
        ;

        $app['cors-enabled']($controllers, ['allowOrigin' => '*']);
        return $controllers;
    }

    public function inviteToTeam(Application $app, Request $req, User $user, User $player, Team $team)
    {
        $notification = new NotificationInviteTeam($player, $user, $team);
        $app['flush']($notification);
        $message = $app['mailerSvc']->getMessage(
            '[Tape dans le fond] Invitation a la team de ' . $user->getName(),
            $user->getEmail(),
            $player->getEmail()
        );
        $message = $app['mailerSvc']->setTeamInvitationBody($message, ['bloub' => 'bloub']);
        $result = $app['mailerSvc']->sendMessage($message);

        return $app->json("ok", 200);
    }

    public function inviteToCompany(Application $app, Request $req, User $user)
    {
        $email = $req->request->get('email', null);
        if ($email === null) {
            return $app->json("Email not provided", 400);
        }

        $company = $user->getCompany();
        if ($company === null) {
            return $app->json("You must have a company", 400);            
        }
        try {
            $newUser = $app['User']->getUserByEmail($email);
            $bool_user = true;
        } catch (\Exception $e) {
            $bool_user = false;
            $newUser = new User();
            $newUser->setEmail($email);
            $app['flush']($newUser);
            $app['entityManager']->refresh($newUser);
        }

        $notification = new NotificationInviteCompany(
            $newUser,
            $user,
            $company,
            $bool_user === true ? $email : null
        );
        $app['flush']($notification);

        $message = $app['mailerSvc']->getMessage(
            '[Tape dans le fond] Invitation a la company de ' . $user->getName(),
            $user->getEmail(),
            $email
        );
        $message = $app['mailerSvc']->setCompanyInvitationBody($message, ['isNew' => $bool_user]);
        $result = $app['mailerSvc']->sendMessage($message);

        return $app->json("ok", 200);
    }
}