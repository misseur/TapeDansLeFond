<?php

namespace TDLF\Controllers;

use Silex\Application;
use Silex\Api\ControllerProviderInterface;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

use TDLF\Entity;

class UserController implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

        $controllers->get('/hello', [$this, 'hello'])
                    ->before($app['Hello']('World!'));

        $controllers->get('/blog/{id}', [$this, 'createUser']);
        $controllers->get('/login/{id}', [$this, 'getUser']);

        $controllers->post('/register_user', [$this, 'registerUser']);
        $controllers->post('/login_user', [$this, 'loginUser']);
        $controllers->post('/logout', [$this, 'logoutUser']);

        $app['cors-enabled']($controllers, ['allowOrigin' => '*']);

        return $controllers;
    }

    public function hello()
    {
        return '';
    }

    public function createUser(Application $app, Request $req, $id)
    {
        $user = new Entity\User();
        $user->setName($id);
        $app['entityManager']->persist($user);
        $app['entityManager']->flush();
        return $user->getId();
    }

    public function getUser(Application $app, $id)
    {
        $user = $app['entityManager']->find("TDLF\Entity\User", $id);
        //Method find marche comme ceci (Nom de la classe que tu cherche, id)
        //$user est un Objet User du coup !
        return $user;
    }
    
    public function loginUser(Application $app, Request $req)
    {
        $email = $req->get('email');
        $pass = $req->get('shapass');
        try {
            $user = $app['User']->getUserByEmail($email);
        } catch (\Exception $exception) {
            return $app->json('User not found', 400);
        }
        if ($user->getPass() != $pass)
            return $app->json('Bad Password', 400);
        else {
            return $app->json($this->goodCredentials($app, $user), 200);
        }
    }

    public function logoutUser(Application $app, Request $req) {
        $id = $req->get('id');
        $user = $this->getUser($app, $id);
        if ($user->getToken() == "")
            return $app->json("Logout impossible", 400);
        else {
            $user->setToken("");
            $app['entityManager']->persist($user);
            $app['entityManager']->flush();
            return $app->json("",200);
        }
    }

    public function goodCredentials(Application $app, Entity\User $user) {
        $token = $user->getEmail();
        $date = new \DateTime();
        $date = $date->format('Y-m-d H-m-s');
        $token = $token.$date;
        for ($i = 0; $i < 10; $i++) {
            $token = hash('sha256', $token);
        }
        $user->setToken($token);
        $app['entityManager']->persist($user);
        $app['entityManager']->flush();
        return array(
            'token' => $token,
            'expire' => $date,
            'id' => $user->getId());
    }

    public function registerUser(Application $app, Request $req)
    {
        $name = $req->get('name', null);
        $email = $req->get('email', null);
        $shapass = $req->get('shapass', null);
        
        if ($name === null || $email === null || $shapass === null) {
            return $app->abort(400, 'Paramètre manquant');
        }
        $user = new Entity\User();
        $user->setName($name);
        $user->setEmail($email);
        $user->setPass($shapass);
        $app['entityManager']->persist($user);
        $app['entityManager']->flush();
        return $app->json($user->getId(), 200);
    }
}
