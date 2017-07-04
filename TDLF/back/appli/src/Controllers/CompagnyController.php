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
use TDLF\Entity\Compagny;
use TDLF\Controllers\UserController;

use Symfony\Component\HttpFoundation\Request;

class CompagnyController implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

        $controllers->post('/compagny/update', [$this, 'updateCompagny']);
        $controllers->get('/compagny/*', [$this, 'allCompagny']);
        $controllers->get('/compagny/create', [$this, 'createCompagny']);

        $app['cors-enabled']($controllers, ['allowOrigin' => '*']);
        return $controllers;
    }

    public function createCompagny(Application $app, $name){
        $compagny = new Compagny();
        $compagny->setName($name);
        $app['entityManager']->persist($compagny);
        $app['entityManager']->flush();
        return $compagny;
    }

    public function getCompagny(Application $app, $id) {
        $compagny = $app['entityManager']->find("TDLF\Entity\Compagny", $id);
        return $compagny;
    }

    public function allCompagny(Application $app, Request $req = NULL) {

        return $app->json($app['Compagny']->getAllCompagny(), 200);
    }

    public function updateCompagny(Application $app, Request $req) {
        $userController = new UserController();
        if (!($userController->isAuth($app, $req)))
            return $app->json('Unthorized', 401);
        $iduser = $req->get('id');
        $user = $userController->getUser($app, $iduser);
        if ($user->getCompagny() == NULL)
            return $app->json("The user doesn't have a compagny registred", 400);
        $compagny = $this->getCompagny($app, $user->getCompagny());
        if ($compagny == NULL)
            return $app->json("The user doesn't have a compagny registred", 400);
        $address = $req->get('address');
        $cp = $req->get('cp');
        $city = $req->get('city');
        $logo = $req->get('logo');
        if (!empty($address))
            $compagny->setAddress($address);
        if (!empty($cp))
            $compagny->setPostalCode($cp);
        if (!empty($city))
            $compagny->setCity($city);
        if (!empty($logo))
            $compagny->setLogo($logo);
        $app['entityManager']->persist($compagny);
        $app['entityManager']->flush();
    }


}