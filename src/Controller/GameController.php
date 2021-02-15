<?php

namespace App\Controller;

use App\Entity\Game;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Form\GameType;
use App\Service\GameService;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

class GameController extends AbstractApiController
{
  /**
   * @Route("/api/game", methods={"GET"},  name="game_list")   
   */
  public function index(GameService $service)
  {
    $games = $service->findAll();
    $json = $this->serialize($games, ['show_game']);
    return $this->respond($json);
  }

  /**
   * @Route("/api/game/new", methods={"POST"}, name="new_game") 
   *  @ParamConverter("game", converter="fos_rest.request_body")
   */
  public function new(Game $game, Request $request, GameService $service)
  {
    $form = $this->buildForm(GameType::class, $game);
    $form->handleRequest($request);

    if (!$form->isSubmitted() || !$form->isValid()) {
      return $this->respond($form, Response::HTTP_BAD_REQUEST);
    }

    $game = $form->getData();
    $service->save($game);

    $json = $this->serialize($game, ['show_game']);
    return $this->respond($json, Response::HTTP_CREATED);
  }

  /**
   * @Route("/api/game/edit/{id}", methods={"GET", "POST", "PUT"} ,name="edit_game" )   
   * @ParamConverter("game", class="App:Game")
   */
  public function edit(Game $game, Request $request, GameService $service)
  {
    if (!$game) {
      throw new NotFoundHttpException('Game not found');
    }

    $form = $this->buildForm(GameType::class, $game);
    $form->handleRequest($request);

    if (!$form->isSubmitted()) {
      return $this->respond($form, Response::HTTP_BAD_REQUEST);
    }

    $game = $form->getData();
    $service->update($game);

    $json = $this->serialize($game, ['show_game']);
    return $this->respond($json);
  }

  /**
   * @Route("/api/game/{id}", methods={"GET"} ,name="game_show" )
   * @ParamConverter("game", class="App:game")
   */
  public function show(Game $game)
  {
    $json = $this->serialize($game, ['show_game']);
    return $this->respond($json);
  }

  /**
   * * @Route("/api/game/delete/{id}", methods={"DELETE"} ,name="game_delete")
   * @ParamConverter("game", class="App:Game")
   */
  public function delete(Game $game, GameService $service)
  {
    $service->delete($game);
    return $this->respond(null, Response::HTTP_NO_CONTENT);
  }
}
