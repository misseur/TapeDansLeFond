<?php
/**
 * Created by PhpStorm.
 * User: benoit-xavierhouvet
 * Date: 05/07/2017
 * Time: 02:06
 */

namespace TDLF\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 *
 * @Entity @Table(name="team")
 */
class Team
{

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
     * @ManyToOne(targetEntity="User")
     * @JoinColumn(name="player_id", referencedColumnName="id")
     */

    private $player;

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
     * @return mixed
     */
    public function getPlayer()
    {
        return $this->player;
    }

    /**
     * @param mixed $player
     */
    public function setPlayer($player)
    {
        $this->player = $player;
    }




}