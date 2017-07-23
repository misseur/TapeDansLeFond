<?php

namespace TDLF\Controllers;

use Silex\Application;
use Silex\Api\ControllerProviderInterface;

use Symfony\Component\HttpFoundation\Request;
use Exception;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

use TDLF\Entity;
use TDLF\Entity\User;

class UserController implements ControllerProviderInterface
{
    public function connect(Application $app) {
        $controllers = $app['controllers_factory'];

        $controllers->post('/register', [$this, 'registerUser']);
        $controllers->post('/login', [$this, 'loginUser']);
        $controllers->get('/user', [$this, 'getUser'])
            ->before($app['isAuth']());
        $controllers->get('/user/company', [$this, 'getCompanyUser'])
            ->before($app['isAuth']());
        $controllers->post('/logout', [$this, 'logoutUser'])
            ->before($app['isAuth']());
        $controllers->post('/user/teams', [$this, 'getTeams'])->before($app['isAuth']());

        $controllers->post('/user/invite', [$this, 'sendMailInviteUser'])
            ->before($app['isAuth']());

        $app['cors-enabled']($controllers, ['allowOrigin' => '*']);

        return $controllers;
    }

    public function getUser(Application $app, Request $req, User $user) {
        return $app->json($user, 200);
    }

    public function getCompanyUser(Application $app, Request $req, User $user) {
        if ($user->getCompany() == null)
            return $app->json(null);
        return $app->json($user->getCompany(), 200);
    }

    public function sendMailInviteUser(Application $app, Request $req, User $user) {
        $email = $req->get('email');
        $from = array('tdlf7fault@gmail.com' => 'Tape Dans Le Fond');
        $to = array($email => $email);
        $message = $app['mailerSvc']->getMessage("Invitation a Tape Dans Le Fond", $from, $to);
        $message = $app['mailerSvc']->setSiteInvitationBody($message, [
            'name' => $user->getName(),
            'email' => $user->getEmail()
        ]);
        $result = $app['mailerSvc']->sendMessage($message);
        return $app->json($result, 200);
    }

    public function createUser(Application $app, Request $req, $id) {
        $user = new Entity\User();
        $user->setName($id);
        $app['flush']($user);
        return $user->getId();
    }

    public function loginUser(Application $app, Request $req) {
        $email = $req->get('email');
        $pass = $req->get('password');
        try {
            $user = $app['User']->getUserByEmail($email);
        } catch (\Exception $exception) {
            return $app->json('User not found', 400);
        }
        if ($user->getPassword() != $pass)
            return $app->json('Bad Password', 400);
        else {
            return $app->json(
                array(
                    'token' => $this->goodCredentials($app, $user),
                    'user' => $user
                ), 200);
        }
    }

    public function logoutUser(Application $app, Request $req, User $user) {
        if ($user->getToken() == "")
            return $app->json("Logout impossible", 400);
        else {
            $user->setToken("");
            $app['flush']($user);
            return $app->json("Logout Successful",200);
        }
    }

    public function goodCredentials(Application $app, Entity\User $user) {
        $token = $user->getEmail();
        $date = new \DateTime('+1days');
        $date = $date->format('Y-m-d H-m-s');
        $token = $token.$date;
        for ($i = 0; $i < 10; $i++) {
            $token = hash('sha256', $token);
        }
        $user->setToken($token);
        $app['flush']($user);
        return [
            'token' => $token,
            'expire' => $date,
            'id' => $user->getId()
        ];
    }

    public function registerUser(Application $app, Request $req) {
        $email = $req->get('email', null);
        $shapass = $req->get('password', null);
        if ($email === null || $shapass === null) {
            return $app->abort(400, 'Paramètre manquant');
        }
        $name = [];
        preg_match("/([a-zA-Z0-9_.+]+)@/", $email, $name);
        $user = new Entity\User();
        $user->setName($name[1]);
        $user->setEmail($email);
        $user->setPassword($shapass);
        try {
            $app['flush']($user);
        } catch (Exception $e) {
			return $app->json($e->getMessage(), 400);
            return $app->json("Email déjà enregistré", 400);
        }
        return $app->json($user->getId(), 200);
    }
    
    public function getTeams(Application $app, Request $req, User $user)
    {
		return $app->json($user->getTeams(), 200);
	}
}
