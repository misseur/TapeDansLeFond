<?php

namespace TDLF\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Mapping as ORM;

use TDLF\Entity;


class CompanyRepository extends EntityRepository
{
    public function getAllCompany() {
        $compagnies = $this->_em->createQuery('select c from TDLF\Entity\Company c')->getResult();
        return $compagnies;
    }

    public function getCompany($id) {
        $company = $this->_em->createQuery('select c from TDLF\Entity\Company c where c.id =\''.$id.'\'')->getSingleResult();
        return $company;
    }
}