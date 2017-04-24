<?php


require_once 'createUser.php';
require_once 'getUser.php';

function setRoute($app, $entityManager)
{
    $app->get('/blog/{id}', function ($id) use ($entityManager) { return createUser($id, $entityManager); });
    $app->get('/login/{id}', function ($id) use ($entityManager) { return getUser($id, $entityManager); });
}
