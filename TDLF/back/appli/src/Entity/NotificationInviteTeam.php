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
 * @Entity @Table(name="`notificationinviteteam`")
 */
class NotificationInviteTeam implements JsonSerializable
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
     * @OneToOne(targetEntity="Notification", cascade={"persist"})
     * @JoinColumn(name="notification_id", referencedColumnName="id", nullable=false)
     */

    private $notification;

    /**
     * @OneToOne(targetEntity="User")
     * @JoinColumn(name="creator_id", referencedColumnName="id", nullable=false)
     */

    private $creator;


    /**
     * @OneToOne(targetEntity="Team")
     * @JoinColumn(name="team_id", referencedColumnName="id", nullable=false)
     */

    private $team;

    public function __construct($user, $creator, $team)
    {
        $this->notification = new Notification($user, 'inviteteam');
        $this->creator = $creator;
        $this->team = $team;
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


