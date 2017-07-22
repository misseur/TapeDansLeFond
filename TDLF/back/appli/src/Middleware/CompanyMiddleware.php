<?php

namespace TDLF\Middleware;

use Silex\Application;

use Pimple\Container;
use Pimple\ServiceProviderInterface;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class CompanyMiddleware implements ServiceProviderInterface
{
    public function register(Container $app)
    {
        $app['getCompany'] = $app->protect(function () {
            return function (Request $req, Application $app) {
                $id = $req->attributes->get('id', null);
                if ($id == null)
                    return $app->json('Id must be provided', 400);

                $company = $app['CompanySvc']->getCompany($id);

                if ($company == null)
                    return $app->json('Company not found', 404);

                $req->attributes->set('company', $company);
                $req->attributes->remove('id');
            };
        });
    }
}