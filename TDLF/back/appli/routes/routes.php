<?php

function setRoute($app, $entityManager)
{
        $app->get('/blog/{id}', function ($id) use ($entityManager) {
        $user = new User();
        $user->setName($id);
        $entityManager->persist($user);
        $entityManager->flush();
        return $user->getId();
    });

    $app->get("/login/{id}", function ($id) use ($entityManager) {
        //Method find marche comme ceci (Nom de la classe que tu cherche, id)
        $user = $entityManager->find("User", $id);
        //$user est un Objet User du coup !
        return $user->getName();
    });
}
