<?php
/**
 * Created by PhpStorm.
 * User: benoit-xavierhouvet
 * Date: 05/07/2017
 * Time: 02:06
 */

namespace TDLF\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 *
 * @Entity @Table(name="league")
 *
 */

class League
{
    public function __construct()
    {
        $this->matches = new ArrayCollection();
        $this->teams = new ArrayCollection();
        $this->mode = "stack";
    }

    /**
     * @id @Column(type="integer") @GeneratedValue
     */
    private $id;

    /**
     * @var ArrayCollection League $matches
     * @OneToMany(targetEntity="Match", mappedBy="id")
     */
    private $matches;

    /**
     * @var ArrayCollection League $players
     * @ManyToMany(targetEntity="Team", mappedBy="leagues")
     */
    private $teams;

    /**
     * @mode @Column(type="string")
     */
    private $mode;

    /**
     * @round @Column(type="integer")
     */
    private $round;

    /**
     * @return mixed $id
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
     * @return ArrayCollection
     *
     */
    public function getMatches()
    {
        return $this->matches;
    }

    /**
     *
     * @param ArrayCollection $matches
     *
     */
    public function setMatches($matches)
    {
        $this->matches = $matches;
    }

    /**
     *
     * @return ArrayCollection
     *
     */
    public function getTeams()
    {
        return $this->teams;
    }

    /**
     *
     * @param ArrayCollection $teams
     *
     */
    public function setTeams($teams)
    {
        $this->teams = $teams;
    }


    /**
     * @return mixed $mode
     */
    public function getMode()
    {
        return $this->mode;
    }

    /**
     * @param mixed $mode
     */
    public function setMode($mode)
    {
        $this->mode = $mode;
    }

    /**
     * @return mixed
     */
    public function getRound()
    {
        return $this->round;
    }

    /**
     * @param mixed $round
     */
    public function setRound($round)
    {
        $this->round = $round;
    }
}
