<?php
/**
 * Created by PhpStorm.
 * User: benoit-xavierhouvet
 * Date: 21/04/2017
 * Time: 11:23
 */
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

require_once __DIR__.'/vendor/autoload.php';

// Create a simple "default" Doctrine ORM configuration for Annotations
$isDevMode = true;
$config = Setup::createAnnotationMetadataConfiguration(array(__DIR__."/src"), $isDevMode);
// or if you prefer yaml or XML
//$config = Setup::createXMLMetadataConfiguration(array(__DIR__."/config/xml"), $isDevMode);
//$config = Setup::createYAMLMetadataConfiguration(array(__DIR__."/config/yaml"), $isDevMode);

// database configuration parameters
$conn = array(
    'dbname' => 'tdlf_bdd',
    'user' => 'bx',
    'password' => 'toto',
    'host' => 'db',
    'driver' => 'pdo_mysql',
);

// obtaining the entity manager
$entityManager = EntityManager::create($conn, $config);