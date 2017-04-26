<?php
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
function registerUser($request, $entityManager)
{
    $uuid = $request->get('uuid');
    $name = $request->get('name');
    
    $user = $entityManager->find("User", $uuid);
    
    if ($user != null)
        throw new NotFoundHttpException(sprintf('uuid %s already exist', $uuid));
    
    $user = new User();
    $user->setUUId($uuid);
    $user->setName($request->get($name));
    $entityManager->persist($user);
    $entityManager->flush();
    
    return $user->getId();
}
