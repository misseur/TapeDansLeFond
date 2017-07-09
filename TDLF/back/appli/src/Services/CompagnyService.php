<?php

/**
 * Created by PhpStorm.
 * User: benoit-xavierhouvet
 * Date: 05/07/2017
 * Time: 00:26
 */

namespace TDLF\Services;

use Silex\Application;
use Silex\Api\ControllerProviderInterface;
use Silex\ControllerCollection;
use TDLF\Entity\Compagny;
use TDLF\Controllers\UserController;

use Symfony\Component\HttpFoundation\Request;

use TDLF\Entity;

class CompagnyService
{
    private $app;

    function __construct(Application $app)
    {
        $this->app = $app;
    }

    public function getCompagny($id) {
        return $this->app['entityManager']->find("TDLF\Entity\Compagny", $id);
    }
}