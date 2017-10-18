<?php

$app->get('/pokemons/list', 'App\Pokemons\Controller\IndexController::listAction')->bind('pokemons.list');
