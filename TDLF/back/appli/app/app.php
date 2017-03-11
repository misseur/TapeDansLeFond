<?php

require_once __DIR__.'../vendor/autoload.php';
require_once __DIR__.'../config/db.php';

$app = new Silex\Application();

$app->register(new Silex\Provider\DoctrineServiceProvider());
$app['db_options'] = $db_options;

$app['debug'] = true;


$app->get('/', function() { return "Yo !"; });

