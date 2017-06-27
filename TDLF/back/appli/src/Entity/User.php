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
     * @Id @Column(type="integer") @GeneratedValue
     */
    private $id;

    /**
     * @Column(type="string")
     */
    private $name;


    /**
     * @email @Column(type="string")
     */

    private $email;

    /**
     * @sha512pass @Column(type="string")
     */

    private $sha512pass;

    /**
     * @token @Column(type="string")
     */

    private $token;

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
    public function setPass($sha512pass)
    {
        $this->sha512pass = $sha512pass;
        return $this;
    }

    /**
     * @return string
     */
    public function getPass()
    {
        return $this->sha512pass;
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


}
