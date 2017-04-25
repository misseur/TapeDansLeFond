<?php

function registerUser($request, $entityManager)
{
    $user = new User();
    $user->setId($request->get('email'));
    $entityManager->persist($user);
    $entityManager->flush();
    
    return $user;
}
