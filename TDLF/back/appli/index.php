<?php
require_once __DIR__.'/vendor/autoload.php';

$app = new Silex\Application();

$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'db.options' => array(
        'driver'   => 'pdo_mysql',
        'host'      => 'localhost',
        'dbname'    => 'tdlf_bdd',
        'user'      => 'root',
        'charset'   => 'utf8',
    ),
));

$app->get('/email/{email}', function ($email) use ($app) {
  $sql = "SELECT * FROM utilisateur WHERE email = ?";
  $post = $app['db']->fetchAssoc($sql, array((string) $email));
  return 'Hello '.$post['prenom'].' '.$post['nom'];
});

$app['debug'] = true;

$app->run();
?>
