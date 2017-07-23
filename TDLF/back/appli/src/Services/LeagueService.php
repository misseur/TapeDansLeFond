<?php
/**
 * Created by PhpStorm.
 * User: benoit-xavierhouvet
 * Date: 23/07/2017
 * Time: 02:53
 */

namespace TDLF\Services;


class LeagueService
{
    private $app;

    function __construct(Application $app)
    {
        $this->app = $app;
    }

    public function getLeague(Application $app, $id) {
        return $this->app['entityManager']->find("TDLF\Entity\League", $id);
    }
}