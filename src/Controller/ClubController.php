<?php

namespace App\Controller;

use App\Entity\Club;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\ClubRepository;
use App\Service\ClubService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use App\Form\ClubType;

class ClubController extends AbstractApiController
{
  /**
  * @Route("/api/club", methods={"GET"},  name="club_list")   
   */
  public function index(ClubService $service)
  {
    $clubs = $service->findAll();
    $json = $this->serialize($clubs, ['show_club']);
    return $this->respond($json, Response::HTTP_CREATED);
  }

  /**
   * @Route("/api/club/new", methods={"POST"}, name="new_club") 
   *  @ParamConverter("club", converter="fos_rest.request_body")
   * 
   */

  public function new(Club $club, Request $request, ClubService $service)
  {
    $form = $this->buildForm(ClubType::class, $club);

    $form->handleRequest($request);

    if (!$form->isSubmitted() || !$form->isValid()) {
      return $this->respond($form, Response::HTTP_BAD_REQUEST);
    }

    $club = $form->getData();
    $service->save($club);

    $json = $this->serialize($club, ['show_club']);
    return $this->respond($json, Response::HTTP_CREATED); 
   }

  /**
   * @Route("/api/club/{id}", methods={"GET"} ,name="club_show" )
   * @ParamConverter("club", class="App:Club")
   */
  public function show(Club $club)
  {
    $json = $this->serialize($club, ['show_club']);
    return $this->respond($json);
  }

  /**
   * @Route("/api/club/edit/{id}", methods={"GET", "POST", "PUT"} ,name="edit_club" )   
   * @ParamConverter("club", class="App:Club")
   */
  public function edit(Club $club, Request $request, ClubService $service)
  {
    if (!$club) {
      throw new NotFoundHttpException('Club not found');
    }
    $form = $this->buildForm(ClubType::class, $club);

    $form->handleRequest($request);
    
    if (!$form->isSubmitted() ) {
      return $this->respond($form, Response::HTTP_BAD_REQUEST);
    }

    $club = $form->getData();
    $service->update($club);

    $json = $this->serialize($club, ['show_club']);
    return $this->respond($json, Response::HTTP_CREATED);
  }

  /**
   * @Route("/api/club/delete/{id}", name="delete_club")
   */
  public function delete(Club $club, ClubService $service)
  {
    $service->delete($club);
    return $this->respond(null, Response::HTTP_NO_CONTENT);
  }
}
