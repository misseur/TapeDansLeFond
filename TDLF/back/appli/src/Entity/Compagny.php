<?php
/**
 * Created by PhpStorm.
 * User: benoit-xavierhouvet
 * Date: 20/04/2017
 * Time: 12:50
 */

namespace TDLF\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 *
 * @Entity @Table(name="compagny")
 */
class Compagny
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
     * @teams @Column(type="string")
     */

    private $teams;

    /**
     * @address @Column(type="string")
     */

    private $address;

    /**
     * @postalcode @Column(type="string")
     */

    private $postalcode;

    /**
     * @city @Column(type="string")
     */

    private $city;

    /**
     * @logo @Column(type="string")
     */

    private $logo;

    /**
     * @endEmail @Column(type="string")
     */

    private $endEmail;

    /**
     * @ManyToOne(targetEntity="User")
     * @JoinColumn(name="user_id", referencedColumnName="id")
     */

    private $adminUser;

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
    public function getTeams()
    {
        return $this->teams;
    }

    /**
     * @param mixed $teams
     */
    public function setTeams($teams)
    {
        $this->teams = $teams;
    }

    /**
     * @return mixed
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * @param mixed $address
     */
    public function setAddress($address)
    {
        $this->address = $address;
    }

    /**
     * @return mixed
     */
    public function getPostalcode()
    {
        return $this->postalcode;
    }

    /**
     * @param mixed $postalcode
     */
    public function setPostalcode($postalcode)
    {
        $this->postalcode = $postalcode;
    }

    /**
     * @return mixed
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * @param mixed $city
     */
    public function setCity($city)
    {
        $this->city = $city;
    }

    /**
     * @return mixed
     */
    public function getLogo()
    {
        return $this->logo;
    }

    /**
     * @param mixed $logo
     */
    public function setLogo($logo)
    {
        $this->logo = $logo;
    }

    /**
     * @return mixed
     */
    public function getEndEmail()
    {
        return $this->endEmail;
    }

    /**
     * @param mixed $endEmail
     */
    public function setEndEmail($endEmail)
    {
        $this->endEmail = $endEmail;
    }

    /**
     * @return mixed
     */
    public function getAdminUser()
    {
        return $this->adminUser;
    }

    /**
     * @param mixed $adminUser
     */
    public function setAdminUser($adminUser)
    {
        $this->adminUser = $adminUser;
    }

}


