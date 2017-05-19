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
     * @uuid @Column(type="string")
     */
     private $uuid;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }
    
    /**
     * @return string
     */
     
     public function getUUID()
     {
         return $this->uuid;
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
     * @param string $uuid;
     * 
     * @return User
     */
     public function setUUID($uuid)
     {
         $this->uuid = $uuid;
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
      * @parap string $pass
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
}
