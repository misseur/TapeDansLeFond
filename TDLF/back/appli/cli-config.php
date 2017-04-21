<?php
/**
 * Created by PhpStorm.
 * User: benoit-xavierhouvet
 * Date: 21/04/2017
 * Time: 11:02
 */

// cli-config.php
require_once "bootstrap.php";

return \Doctrine\ORM\Tools\Console\ConsoleRunner::createHelperSet($entityManager);