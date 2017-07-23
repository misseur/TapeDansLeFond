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
use JsonSerializable;
/**
 *
 * @Entity @Table(name="team")
 */
class Team implements JsonSerializable
{
    public function jsonSerialize()
    {
        $players = [];
        foreach ($this->players as $player) {
            $players[] = $player->jsonSerialize();
        }
        return [
            'name' => $this->name,
            'description' => $this->description,
            'creator' => $this->creator->jsonSerialize(),
            'players' => $players
        ];
    }

    public function __construct()
    {
        $this->players = new ArrayCollection();
    }

    /**
     * @id @Column(type="integer") @GeneratedValue
     */
    private $id;

    /**
     * @name @Column(type="string")
     */
    private $name;

    /**
     * @description @Column(type="string", nullable=true)
     */
    private $description;

    /**
     * @ManyToOne(targetEntity="User")
     * @JoinColumn(name="creator_id", referencedColumnName="id")
     */

    private $creator;

    /**
     * @var ArrayCollection Team $players
     *
     * @ManyToMany(targetEntity="User", mappedBy="teams", cascade={"persist", "merge"})
     *
     */

    private $players;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param mixed $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * @return mixed
     */
    public function getCreator()
    {
        return $this->creator;
    }

    /**
     * @param mixed $creator
     */
    public function setCreator($creator)
    {
        $this->creator = $creator;
    }

    /**
     * @return ArrayCollection
     */
    public function getPlayers()
    {
        return $this->players;
    }

    /**
     * @param ArrayCollection $players
     */
    public function setPlayers($players)
    {
        $this->players = $players;
    }
    
    /**
     * @return ArrayCollection
     */
    public function getLeagues()
    {
		return $this->leagues;
	}
	
	/*
	 * @param ArrayCollection $leagues
	 * 
	 */
	public function setLeagues($leagues)
	{
		$this->leagues = $leagues;
	}

	/**
	 * @var ArrayCollection League $players
	 * @ManyToMany(targetEntity="League", inversedBy="teams")
	 */
	private $leagues;

}
