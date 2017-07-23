<?php
/**
 * Created by PhpStorm.
 * User: benoit-xavierhouvet
 * Date: 23/07/2017
 * Time: 02:24
 */

namespace TDLF\Controllers;

use Silex\Application;
use Silex\Api\ControllerProviderInterface;
use Silex\ControllerCollection;

class MatchController implements ControllerProviderInterface
{
    public function connect(Application $app) {
        $controllers = $app['controllers_factory'];

        $app['cors-enabled']($controllers, ['allowOrigin' => '*']);

        return $controllers;
    }

}