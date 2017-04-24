<?php

function getUser($id, $entityManager)
{
    //Method find marche comme ceci (Nom de la classe que tu cherche, id)
    $user = $entityManager->find("User", $id);
    //$user est un Objet User du coup !
    return $user->getName();
}
