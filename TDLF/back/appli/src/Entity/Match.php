<?php

namespace TDLF\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 *
 * @Entity @Table(name="match")
 *
 */
class Match
{
    public function __construct()
    {
    }

    /**
     *
     * @return mixed
     *
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     *
     * @param mixed $id
     *
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     *
     * @return mixed
     *
     */
    public function getTeamA()
    {
        return $this->teamA;
    }

    /**
     *
     * @param mixed $teamA
     *
     */
    public function setTeamA($team)
    {
        $this->teamA = $team;
    }


    /**
     *
     * @return mixed
     *
     */
    public function getTeamB()
    {
        return $this->teamB;
    }

    /**
     *
     * @param mixed $team
     *
     */
    public function setTeamB($team)
    {
        $this->teamB = $team;
    }

    /**
     *
     * @return mixed
     *
     */
    public function getLeagueId()
    {
        return $this->leagueId;
    }

    /**
     *
     * @param mixed $leagueId
     *
     */
    public function setLeagueId($leagueId)
    {
        $this->setLeagueId($leagueId);
    }

    /**
     *
     * @id @Column(type="integer") @GeneratedValue
     *
     */
    private $id;

    /**
     *
     * @ManyToOne(targetEntity="Team")
     * @JoinColumn(name="teama_id", referencedColumnName="id")
     *
     */
    private $teamA;

    /**
     *
     * @ManyToOne(targetEntity="Team")
     * @JoinColumn(name="teamb_id", referencedColumnName="id")
     *
     */
    private $teamB;

    /**
     *
     * @ManyToOne(targetEntity="League")
     * @JoinColumn(name="league_id", referencedColumnName="id")
     *
     */
    private $leagueId;
}
