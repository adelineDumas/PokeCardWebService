<?php

namespace App\Pokemons\Controller;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class IndexController
{
    public function listAction(Request $request, Application $app)
    {
        $content = "{
          \"pokemon\": [
            {
              \"nom\": \"pikachu\",
              \"couleur\": \"jaune\"
            }
          ]
        }";
        $head = array("Content-type" => "application/json");

        return new Response($content, Response::HTTP_OK, $head);
    }
}
