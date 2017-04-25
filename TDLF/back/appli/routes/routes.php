<?php

use Symfony\Component\HttpFoundation\Request;

require_once 'createUser.php';
require_once 'getUser.php';
require_once 'registerUser.php';

function setFrontRoutes($app, $entityManager)
{
    $app->get('/blog/{id}', function ($id) use ($entityManager) { return createUser($id, $entityManager); });
    $app->get('/login/{id}', function ($id) use ($entityManager) { return getUser($id, $entityManager); });
    $app->post('/register_user', function (Request $request) use ($entityManager) { return registerUser($request, $entityManager); });
}
