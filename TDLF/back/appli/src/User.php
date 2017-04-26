<?php
/**
 * Created by PhpStorm.
 * User: benoit-xavierhouvet
 * Date: 20/04/2017
 * Time: 12:50
 */

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
     * @paramint $uuid;
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
     * @param string $name
     *
     * @return User
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }
}
