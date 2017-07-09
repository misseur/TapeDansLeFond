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
 * @Entity @Table(name="user")
 */
class User
{
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
     * Many Users have one Compagny
     * @ManyToOne(targetEntity="Compagny")
     * @JoinColumn(name="compagny_id", referencedColumnName="id")
     */

    private $compagny;

    /**
     * @role @Column(type="string", nullable=true)
     */

    private $role;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param int $id
     *
     * @return User
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param string $name
     *
     * @return User
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @param string $email
     *
     * @return User
     */
    public function setEmail($email)
    {
        $this->email = $email;
        return $this;
    }

    /**
     * @param string $pass
     *
     * @return User
     */
    public function setPassword($password)
    {
        $this->password = $password;
        return $this;
    }

    /**
     * @return string
     */
    public function getPass()
    {
        return $this->password;
    }

    /**
     * @return string
     */
    public function getToken()
    {
        return $this->token;
    }

    /**
     * @param string $token
     */
    public function setToken($token)
    {
        $this->token = $token;
    }

    /**
     * @return mixed
     */
    public function getCompagny()
    {
        return $this->compagny;
    }

    /**
     * @param mixed $compagny
     */
    public function setCompagny($compagny)
    {
        $this->compagny = $compagny;
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
