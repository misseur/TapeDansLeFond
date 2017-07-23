<?php
/**
 * Created by PhpStorm.
 * User: benoit-xavierhouvet
 * Date: 20/04/2017
 * Time: 12:50
 */

namespace TDLF\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;
/**
 *
 * @Entity @Table(name="`notificationdate`")
 */
class NotificationDate implements JsonSerializable
{
    public function jsonSerialize()
    {
        return [

        ];
    }

    /**
     * @id @Column(type="integer") @GeneratedValue
     */
    private $id;

    /**
     * @check @Column(name="`check`", type="string", nullable=true)
     */
    private $check;

    /**
     * @create @Column(name="`create`", type="string", nullable=false)
     */

    private $create;

    /**
     * @ManyToOne(targetEntity="User")
     * @JoinColumn(name="user_id", referencedColumnName="id", nullable=false)
     */

    private $user;

    public function __construct($user)
    {
        $this->create = new \DateTime("now");
        $this->create = $this->create->format('c');
        $this->check = null;
        $this->user = $user;
    }

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
}


