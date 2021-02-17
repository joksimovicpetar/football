<?php

namespace App\Controller;
use App\Entity\Competition;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Form\CompetitionType;
use App\Service\CompetitionService;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;


class CompetitionController extends AbstractApiController
{
  /**
   * @Route("/api/competition", methods={"GET"},  name="competition_list")   
   */
  public function index(CompetitionService $service)
  {
    $competitions = $service->findAll();
    $json = $this->serialize($competitions, ['show_competition']);
    return $this->respond($json);
  }

  /**
   * @Route("/api/competition/new", methods={"POST"}, name="new_competition") 
   *  @ParamConverter("competition", converter="fos_rest.request_body")
   */
  public function new(Competition $competition, Request $request, CompetitionService $service)
  {
    $parameters = json_decode($request->getContent(), true);
    $name = ($parameters['name']);
    $description = ($parameters['description']);
    $competition = new Competition();
    $competition->setName($name);
    $competition->setDescription($description);

    // $form = $this->buildForm(CompetitionType::class, $competition);
    // $form->handleRequest($request);

    // if (!$form->isSubmitted() || !$form->isValid()) {
    //   return $this->respond($form, Response::HTTP_BAD_REQUEST);
    // }

    // $competition = $form->getData();
    $service->save($competition);

    $json = $this->serialize($competition, ['show_competition']);
    return $this->respond($json, Response::HTTP_CREATED);
  }
  /**
   * @Route("/api/competition/edit/{id}", methods={"GET", "POST", "PUT"} ,name="edit_competition" )   
   * @ParamConverter("competition", class="App:Competition")
   */
  public function edit(Competition $competition, Request $request, CompetitionService $service)
  {
    // if (!$competition) {
    //   throw new NotFoundHttpException('Competition not found');
    // }

    // $form = $this->buildForm(CompetitionType::class, $competition);
    // $form->handleRequest($request);

    // if (!$form->isSubmitted()) {
    //   return $this->respond($form, Response::HTTP_BAD_REQUEST);
    // }
    $parameters = json_decode($request->getContent(), true);
    // echo($content['host']);
    $name = ($parameters['name']);
    $description = ($parameters['description']);
    $id = ($parameters['id']);
    $competition = $service->find($id);
    

    $competition->setName($name);
    $competition->setDescription($description);


    // $competition = $form->getData();
    $service->update($competition);

    $json = $this->serialize($competition, ['show_competition']);
    return $this->respond($json);
  }

  /**
   * @Route("/api/competition/{id}", methods={"GET"} ,name="competition_show" )
   * @ParamConverter("competition", class="App:Competition")
   */
  public function show(Competition $competition)
  {
    $json = $this->serialize($competition, ['show_competition']);
    return $this->respond($json);
  }

  /**
   * * @Route("/api/competition/delete/{id}", methods={"DELETE"} ,name="competition_delete") 
   * @ParamConverter("competition", class="App:Competition")
 
   */
  public function delete(Competition $competition, CompetitionService $service)
  {
    $service->delete($competition);
    return $this->respond(null, Response::HTTP_NO_CONTENT);
  }
}
