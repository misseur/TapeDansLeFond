<?php
error_reporting(-1);
ini_set('display_errors', 'On');
require_once __DIR__.'/vendor/autoload.php';

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
require_once 'src/User.php';

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


$app->get('/blog/{id}', function ($id) use ($entityManager) {
    $user = new User();
    $user->setName($id);
    $entityManager->persist($user);
    $entityManager->flush();
    return $user->getId();
});

$app->get("/login/{id}", function ($id) use ($entityManager) {
    //Method find marche comme ceci (Nom de la classe que tu cherche, id)
    $user = $entityManager->find("User", $id);
    //$user est un Objet User du coup !
    return $user->getName();
});


$app['debug'] = true;

//Request::setTrustedProxies(array($ip));
$app->run();
?>
