<?php

namespace TDLF\Services;

use Silex\Application;
use TDLF\Entity\Team;

class TeamService
{
    private $app;

    function __construct(Application $app)
    {
        $this->app = $app;
    }

    public function getTeam($id) {
        return $this->app['entityManager']->find("TDLF\Entity\Team", $id);
    }
}