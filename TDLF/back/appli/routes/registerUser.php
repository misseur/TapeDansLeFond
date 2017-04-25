<?php

function registerUser($request, $entityManager)
{
    $user = new User();
    $user->setId($request->get('email'));
    //var_dump($request->get('email'));
    $user->setName($request->get('name'));
    $entityManager->persist($user);
    $entityManager->flush();
    
    return $user->getId();
}
