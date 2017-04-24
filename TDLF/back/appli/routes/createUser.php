<?php

function createUser($id, $entityManager)
{
    $user = new User();
    $user->setName($id);
    $entityManager->persist($user);
    $entityManager->flush();
    return $user->getId();
}
