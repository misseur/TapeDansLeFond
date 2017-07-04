<?php

namespace TDLF\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Mapping as ORM;

use TDLF\Entity;


class CompagnyRepository extends EntityRepository
{
    public function getAllCompagny() {
        $compagnies = $this->_em->createQuery('select c from TDLF\Entity\Compagny c')->getResult();
        $i = 0;
        foreach ($compagnies as $compagny) {
            $tmp = array();
            $tmp['name'] = $compagny->getName();
            $tmp['id'] = $compagny->getId();
            $tmp['teams'] = $compagny->getTeams();
            $tmp['address'] = $compagny->getAddress();
            $tmp['cp'] = $compagny->getPostalcode();
            $tmp['city'] = $compagny->getCity();
            $tmp['logo'] = $compagny->getLogo();
            $result[$i] = $tmp;
        }
        return $result;
    }
}