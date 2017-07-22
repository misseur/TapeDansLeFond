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


/**
 *
 * @Entity @Table(name="user")
 */
class User
{
    public function __construct()
    {
        $this->teams = new ArrayCollection();
    }

    public function jsonSerialize() {
        return [
            'name' => $this->name,
            'id' => $this->id,
            'email' => $this->email,
            'company' => $this->company
        ];
    }

    /**
     * @id @Column(type="integer") @GeneratedValue
     */
    private $id;

    /**
     * @name @Column(type="string", nullable=true)
     */
    private $name;

    /**
     * @email @Column(type="string", unique=true)
     */

    private $email;

    /**
     * @password @Column(type="string")
     */

    private $password;

    /**
     * @token @Column(type="string", nullable=true)
     */

    private $token;

    /**
     * Many Users have one Company
     * @ManyToOne(targetEntity="Company")
     * @JoinColumn(name="company_id", referencedColumnName="id")
     */

    private $company;

    /**
     * Many Users have many Teams
     *
     * @var ArrayCollection Team $teams
     *
     * @ManyToMany(targetEntity="Team", inversedBy="players", cascade={"persist", "merge"})
     * @JoinTable(name="users_teams",
     *     joinColumns={@JoinColumn(name="User_id", referencedColumnName="id")},
     *     inverseJoinColumns={@JoinColumn(name="Team_id", referencedColumnName="id")}
     * )
     */

    private $teams;

    /**
     * @role @Column(type="string", nullable=true)
     */

    private $role;

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
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param mixed $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * @return mixed
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @param mixed $password
     */
    public function setPassword($password)
    {
        $this->password = $password;
    }

    /**
     * @return mixed
     */
    public function getToken()
    {
        return $this->token;
    }

    /**
     * @param mixed $token
     */
    public function setToken($token)
    {
        $this->token = $token;
    }

    /**
     * @return mixed
     */
    public function getCompany()
    {
        return $this->company;
    }

    /**
     * @param mixed $company
     */
    public function setCompany($company)
    {
        $this->company = $company;
    }

    /**
     * @return ArrayCollection
     */
    public function getTeams()
    {
        return $this->teams;
    }

    /**
     * @param ArrayCollection $teams
     */
    public function setTeams($teams)
    {
        $this->teams = $teams;
    }

    /**
     * @return mixed
     */
    public function getRole()
    {
        return $this->role;
    }

    /**
     * @param mixed $role
     */
    public function setRole($role)
    {
        $this->role = $role;
    }


}
