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

    public function getUser(Application $app, Request $req, $id)
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
        $user = $app['entityManager']->createQuery('select u.id from TDLF\Entity\User u where u.email =\''.$email.'\'')->getSingleResult();
        $user = $this->getUser($app, $req, $user['id']);
        if ($user === null)
            return $app->json('Bad Request', 400);
        elseif ($user->getPass() != $pass)
            return $app->json('Bad Request', 400);
        else
            return $app->json('Valid Connection', 200);
    }

    public function registerUser(Application $app, Request $req)
    {
        $name = $req->get('name', null);
        $email = $req->get('email', null);
        $shapass = $req->get('shapass', null);
        
        if ($name === null || $email === null || $shapass === null) {
            return $app->abort(400, 'Bad request');
        }

        $user = $app['entityManager']->find("TDLF\Entity\User", $email);
        
        if ($user != null) {
            throw new NotFoundHttpException(sprintf('uuid %s already exist', $uuid));
        }
        
        $user = new Entity\User();
        $user->setName($name);
        $user->setEmail($email);
        $user->setPass($shapass);
        $app['entityManager']->persist($user);
        $app['entityManager']->flush();
        
        // return $user->getId();
        return $app->json($user->getId(), 200);
    }
}
