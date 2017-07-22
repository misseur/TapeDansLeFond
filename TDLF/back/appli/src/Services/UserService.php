<?php

/**
 * Created by PhpStorm.
 * User: benoit-xavierhouvet
 * Date: 05/07/2017
 * Time: 00:26
 */

namespace TDLF\Services;

use Silex\Application;
use TDLF\Entity\User;

class UserService
{
    private $app;

    function __construct(Application $app)
    {
        $this->app = $app;
    }

    public function getUser($id) {
        return $this->app['entityManager']->find("TDLF\Entity\User", $id);
    }
}