<?php

namespace TDLF\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Mapping as ORM;

use TDLF\Entity;

class UserRepository extends EntityRepository {

    public function getUserByEmail($email) {
        $id = $this->_em->createQuery('select u.id from TDLF\Entity\User u where u.email =\''.$email.'\'')->getSingleResult();
        if (isset($id['id'])) {
             return $this->_em->find(Entity\User::class, $id['id']);
        } else {
            return false;
        }
    }
}