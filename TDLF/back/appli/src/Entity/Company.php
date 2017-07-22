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
 * @Entity @Table(name="company")
 */
class Company implements JsonSerializable
{
    public function jsonSerialize()
    {
        return [
            'name' => $this->name,
            'id' => $this->id,
            'address' => $this->address,
            'cp' => $this->postalcode,
            'city' => $this->city,
            'logo' => $this->logo
        ];
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
     * @address @Column(type="string", nullable=true)
     */

    private $address;

    /**
     * @postalcode @Column(type="string", nullable=true)
     */

    private $postalcode;

    /**
     * @city @Column(type="string", nullable=true)
     */

    private $city;

    /**
     * @logo @Column(type="string", nullable=true)
     */

    private $logo;

    /**
     * @endEmail @Column(type="string", nullable=true)
     */

    private $endEmail;

    /**
     * @ManyToOne(targetEntity="User")
     * @JoinColumn(name="user_id", referencedColumnName="id", nullable=true)
     */

    private $adminUser;

    public function __construct()
    {
        $this->teams = new ArrayCollection();
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


