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
use TDLF\Entity\Team;
use TDLF\Entity\User;
use TDLF\Controllers\UserController;

use Symfony\Component\HttpFoundation\Request;

use TDLF\Entity;
use TDLF\Controllers;

class FileController implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

        $controllers->post('/file', [$this, 'postAvatar'])
            ->before($app['isAuth']())
        ;

        $app['cors-enabled']($controllers, ['allowOrigin' => '*']);
        return $controllers;
    }

    public function postAvatar(Application $app, Request $req, User $user)
    {
        $file = $req->files->get('avatar', null);
        if ($file === null) {
            return $app->abort(400, 'Avatar must be provided');
        }

        echo json_encode(get_class_methods($file), JSON_PRETTY_PRINT); die();
        return $app->json("ok", 200);
    }

}