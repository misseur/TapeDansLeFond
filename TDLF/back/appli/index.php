<?php
error_reporting(-1);
ini_set('display_errors', 'On');

require_once __DIR__.'/vendor/autoload.php';

$app = new \TDLF\Application();

$app->run();

?>
