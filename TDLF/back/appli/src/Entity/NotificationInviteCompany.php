<?php
/**
 * Created by PhpStorm.
 * User: benoit-xavierhouvet
 * Date: 20/04/2017
 * Time: 12:50
 */

namespace TDLF\Entity;

use TDLF\Entity\Notification;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;
/**
 *
 * @Entity @Table(name="`notificationinvitecompany`")
 */
class NotificationInviteCompany implements JsonSerializable
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
     * @email @Column(type="string", nullable=true)
     */
    private $email;


    /**
     * @ManyToOne(targetEntity="Notification", cascade={"persist"})
     * @JoinColumn(name="notification_id", referencedColumnName="id", nullable=false)
     */

    private $notification;

    /**
     * @ManyToOne(targetEntity="User")
     * @JoinColumn(name="creator_id", referencedColumnName="id", nullable=false)
     */

    private $creator;


    /**
     * @ManyToOne(targetEntity="Company")
     * @JoinColumn(name="company_id", referencedColumnName="id", nullable=false)
     */

    private $company;



    public function __construct($user, $creator, $company, $email)
    {
        $this->notification = new Notification($user, 'inviteteam');
        $this->creator = $creator;
        $this->company = $company;
        $this->email = $email;
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

    public function getNotification()
    {
        return $this->notification;
    }
}


