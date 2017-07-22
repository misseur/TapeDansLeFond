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
use TDLF\Entity\Company;
use TDLF\Entity\User;
use TDLF\Controllers\UserController;

use Symfony\Component\HttpFoundation\Request;

use TDLF\Entity;
use TDLF\Controllers;

class CompanyController implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

        $controllers->post('/company/update', [$this, 'updateCompany'])
            ->before($app['isAuth']())
        ;

        $controllers->get('/company/all', [$this, 'allCompany'])
            ->before($app['isAuth']())
        ;

        $controllers->post('/company/create', [$this, 'createCompany'])
            ->before($app['isAuth']())
        ;

        $controllers->get('/company/{id}', [$this, 'getCompany'])
            ->before($app['getCompany']())
        ;

        $controllers->post('/company/associate/{id}', [$this, 'associateCompany'])
            ->before($app['isAuth']())
            ->before($app['getCompany']())
        ;


        $app['cors-enabled']($controllers, ['allowOrigin' => '*']);
        return $controllers;
    }

    public function associateCompany(Application $app, Request $req, User $user, Company $company) {
        $user->setCompany($company);
        $app['flush']($user);
        return $app->json("Company associate", 200);
    }


    public function createCompany(Application $app, Request $req, User $user)
    {
        $name = $req->get('name');
        $company = new Company();
        $company->setName($name);
        $company->setAdminUser($user);
        $user->setCompany($company);
        $app['flush']($company);
        $app['flush']($user);
        return $app->json($company->getId(), 200);
    }

    public function getCompany(Application $app, Request $req, Company $Company) {
        return $app->json($Company, 200);
    }

    public function allCompany(Application $app, Request $req = NULL) {
        $Company = $app['Company']->getAllCompany();
        return $app->json($Company, 200);
    }

    public function updateCompany(Application $app, Request $req, User $user) {
        $Company = $user->getCompany();
        if ($Company == NULL || $Company->getAdmin)
            return $app->json("The user doesn't have a Company registred", 400);
        $address = $req->get('address');
        $cp = $req->get('cp');
        $city = $req->get('city');
        $logo = $req->get('logo');
        if (!empty($address))
            $Company->setAddress($address);
        if (!empty($cp))
            $Company->setPostalCode($cp);
        if (!empty($city))
            $Company->setCity($city);
        if (!empty($logo))
            $Company->setLogo($logo);
        $app['flush']($Company);
        return $app->json($app['Company']->getCompany($Company->getId()), 200);
    }


}