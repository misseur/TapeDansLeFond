<?php

namespace TDLF\Controllers;

use Silex\Application;
use Silex\Api\ControllerProviderInterface;

use Symfony\Component\HttpFoundation\Request;

use TDLF\Entity;

class UserController implements ControllerProviderInterface
{

    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

        $controllers->get('/blog/{id}', [$this, 'createUser']);
        $controllers->get('/login/{id}', [$this, 'getUser']);

        $controllers->post('/register_user', [$this, 'registerUser']);

        return $controllers;
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
        try {
        $app['entityManager'];
        $user = $app['entityManager']->find("TDLF\Entity\User", $id);
            
        } catch (\Exception $e) {
            echo $e->getMessage(); die();
        }
        //Method find marche comme ceci (Nom de la classe que tu cherche, id)
        //$user est un Objet User du coup !
        return $user->getName();
    }

    public function registerUser(Application $app, Request $req)
    {
        $uuid = $request->get('uuid');
        $name = $request->get('name');
        
        $user = $app['entityManager']->find("User", $uuid);
        
        if ($user != null) {
            throw new NotFoundHttpException(sprintf('uuid %s already exist', $uuid));
        }
        
        $user = new Entity\User();
        $user->setUUId($uuid);
        $user->setName($request->get($name));
        $app['entityManager']->persist($user);
        $app['entityManager']->flush();
        
        return $user->getId();
    }
}