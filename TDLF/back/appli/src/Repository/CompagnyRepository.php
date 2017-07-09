<?php

namespace TDLF\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Mapping as ORM;

use TDLF\Entity;


class CompagnyRepository extends EntityRepository
{
    public function getAllCompagny() {
        $compagnies = $this->_em->createQuery('select c from TDLF\Entity\Compagny c')->getResult();
        return $compagnies;
    }

    public function getCompagny($id) {
        $compagny = $this->_em->createQuery('select c from TDLF\Entity\Compagny c where c.id =\''.$id.'\'')->getSingleResult();
        return $compagny;
    }
}