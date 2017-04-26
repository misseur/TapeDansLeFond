<?php
error_reporting(-1);
ini_set('display_errors', 'On');
require_once __DIR__.'/vendor/autoload.php';

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;


require_once 'src/User.php';
require_once 'routes/routes.php';

$isDevMode = false;

$app = new Silex\Application();

$conn = array(
    'dbname' => 'tdlf_bdd',
    'user' => 'bx',
    'password' => 'toto',
    'host' => 'db',
    'driver' => 'pdo_mysql',
);
$config = Setup::createAnnotationMetadataConfiguration(array(__DIR__."/src"), $isDevMode);
$entityManager = EntityManager::create($conn, $config);


$app->before(function(Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});

setFrontRoutes($app, $entityManager);

$app['debug'] = true;

//Request::setTrustedProxies(array($ip));
$app->run();
?>
