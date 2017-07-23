<?php
/**
 * Created by PhpStorm.
 * User: benoit-xavierhouvet
 * Date: 20/04/2017
 * Time: 12:50
 */

namespace TDLF\Entity;

use TDLF\Entity\NotificationDate;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;
/**
 *
 * @Entity @Table(name="`notification`")
 */
class Notification implements JsonSerializable
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
     * @type @Column(type="string", nullable=false)
     */
    private $type;

    /**
     * @ManyToOne(targetEntity="NotificationDate", cascade={"persist"})
     * @JoinColumn(name="notification_id", referencedColumnName="id", nullable=false)
     */

    private $notificationDate;

    public function __construct($user, $type)
    {
        $this->notificationDate = new NotificationDate($user);
        $this->type = $type;
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

    public function getNotificationDate()
    {
        return $this->notificationDate;
    }
}


