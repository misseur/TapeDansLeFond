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

        $controllers->post('/compagny/update', [$this, 'updateCompagny'])
            ->before($app['isAuth']())
        ;

        $controllers->post('/compagny/all', [$this, 'allCompagny'])
            ->before($app['isAuth']());
        $controllers->post('/compagny/create', [$this, 'createCompagny'])
            ->before($app['isAuth']());

        $controllers->get('/compagny/{id}', [$this, 'getCompagny'])
            ->before($app['getCompagny']())
        ;

        $controllers->post('/compagny/associate/{id}', [$this, 'associateCompagny'])
            ->before($app['isAuth']())
            ->before($app['getCompagny']())
        ;

        $controllers->post('/compagny/{id}', [$this, 'getCompagny'])
            ->before($app['isAuth']())
            ->before($app['getCompagny']())
        ;


        $app['cors-enabled']($controllers, ['allowOrigin' => '*']);
        return $controllers;
    }

    public function associateCompagny(Application $app, Request $req, User $user, Compagny $compagny) {
        $user->setCompagny($compagny);
        $app['flush']($user);
        $app->json("Compagny associate", 200);
    }

    public function createCompagny(Application $app, Request $req, User $user){
        $name = $req->get('name');
        $compagny = new Compagny();
        $compagny->setName($name);
        $app['entityManager']->persist($compagny);
        $app['entityManager']->flush();
        return $app->json($compagny->getId(), 200);
    }

    public function getCompagny(Application $app, Request $req, Compagny $compagny) {
        return $app->json($compagny, 200);
    }

    public function allCompagny(Application $app, Request $req = NULL) {
        $compagny = $app['Compagny']->getAllCompagny();
        return $app->json($compagny, 200);
    }

    public function updateCompagny(Application $app, Request $req, User $user) {
        $compagny = $user->getCompagny();
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
        $app['flush']($compagny);
        return $app->json($app['Compagny']->getCompagny($compagny->getId()), 200);
    }


}