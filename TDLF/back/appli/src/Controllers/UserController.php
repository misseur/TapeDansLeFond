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
        return $user->getName();
    }
    
    public function loginUser(Application $app, Request $req)
    {
        $email = $req->get('email');
        $user = $app['entityManager']->find("TDLF\Entity\User", $email);
        if ($user == null)
        {
        }
    }

    public function registerUser(Application $app, Request $req)
    {
        $uuid = $req->get('uuid', null);
        $name = $req->get('name', null);
        $email = $req->get('email', null);
        $shapass = $req->get('shapass', null);
        
        if ($uuid === null || $name === null || $email === null || $shapass === null) {
            return $app->abort(400, 'Bad request');
        }

        $user = $app['entityManager']->find("TDLF\Entity\User", $email);
        
        if ($user != null) {
            throw new NotFoundHttpException(sprintf('uuid %s already exist', $uuid));
        }
        
        $user = new Entity\User();
        $user->setUUId($uuid);
        $user->setName($name);
        $user->setEmail($email);
        $user->setPass($shapass);
        $app['entityManager']->persist($user);
        $app['entityManager']->flush();
        
        return $user->getId();
    }
}
