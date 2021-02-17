<?php

namespace App\Controller;

use App\Entity\Player;
use App\Entity\City;
use App\Form\PlayerType;
use App\Entity\Club;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Service\PlayerService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

use Symfony\Component\Validator\Validator\ValidatorInterface;

use App\Repository\PlayerRepository;
use App\Service\CityService;
use App\Service\ClubService;

use Doctrine\ORM\EntityManagerInterface;

class PlayerController extends AbstractApiController
{
  /**
   * @Route("/api/player", methods={"GET"},  name="player_list")   
   */
  public function index(Request $request, PlayerRepository $repository)
  {
    // $pl = $request->query->get('q');
    $players = $repository->findAll();
    $json = $this->serialize($players, ['show_player', 'show_city', 'show_club']);
    return $this->respond($json);
  }

  
  /**
   * @IsGranted("IS_AUTHENTICATED_ANONYMOUSLY")
* @Route("/api/player/new/la", methods={"GET"}, name="new_player1") 
   * */
  public function new1( Request $request, PlayerService $service)
  {
    $player = new Player();

    
    $form = $this->buildForm(PlayerType::class, $player);

    $form->handleRequest($request);

    if (!$form->isSubmitted() || !$form->isValid()) {
        return $this->render('new.html.twig', array(
      'form' => $form->createView()
    ));
    return $this->render('new.html.twig', array(
      'form' => $form->createView()
    ));
      return $this->respond($form, Response::HTTP_BAD_REQUEST);
    }

    // $file = $form['profileImage']->getData();
    // // $file = $request->files->get('form')['profileImage'];
    // $uploads_directory = $this->getParameter('uploads_directory');
    // $filename = md5(uniqid()) . '.' . $file->guessExtension();
    // echo ($filename);
    // $file->move(
    //   $uploads_directory,
    //   $filename
    // );

    // $player = $form->getData();
    // $player->setProfileImage($filename);
    // $service->save($player);


    // $json = $this->serialize($player, ['show_player']);
    // return $this->respond($json, Response::HTTP_CREATED);
    // $player = new Player();

    // $form = $this->createForm(PlayerType::class, $player);


    // $form->handleRequest($request);

    // if ($form->isSubmitted() && $form->isValid()) {
    //   $file = $form['profileImage']->getData();
    //   // $file = $request->files->get('form')['profileImage'];
    //   $uploads_directory = $this->getParameter('uploads_directory');
    //   $filename = md5(uniqid()) . '.' . $file->guessExtension();
    //   echo ($filename);
    //   $file->move(
    //     $uploads_directory,
    //     $filename
    //   );

    //   $player = $form->getData();
    //   $player->setProfileImage($filename);
    //   $service->save($player);

    //   return $this->redirectToRoute('player_list');
    // }

    // return $this->render('new.html.twig', array(
    //   'form' => $form->createView()
    // ));



    
  }

  /**
   * @IsGranted("IS_AUTHENTICATED_ANONYMOUSLY")
* @Route("/api/player/new/la", methods={"POST"}, name="new_player") 
   * */
  public function new( Request $request, PlayerService $service)
  {
    $player = new Player();

    
    $form = $this->buildForm(PlayerType::class, $player);

    $form->handleRequest($request);

    if (!$form->isSubmitted() || !$form->isValid()) {
        return $this->render('new.html.twig', array(
      'form' => $form->createView()
    ));
      return $this->respond($form, Response::HTTP_BAD_REQUEST);
    }

    $file = $form['profileImage']->getData();
    // $file = $request->files->get('form')['profileImage'];
    $uploads_directory = $this->getParameter('uploads_directory');
    $filename = md5(uniqid()) . '.' . $file->guessExtension();
    echo ($filename);
    $file->move(
      $uploads_directory,
      $filename
    );

    $player = $form->getData();
    $player->setProfileImage($filename);
    $service->save($player);

    return $this->redirect('http://localhost:8000/players');
    // $json = $this->serialize($player, ['show_player']);
    // return $this->respond($json, Response::HTTP_CREATED);
    // $player = new Player();

    // $form = $this->createForm(PlayerType::class, $player);


    // $form->handleRequest($request);

    // if ($form->isSubmitted() && $form->isValid()) {
    //   $file = $form['profileImage']->getData();
    //   // $file = $request->files->get('form')['profileImage'];
    //   $uploads_directory = $this->getParameter('uploads_directory');
    //   $filename = md5(uniqid()) . '.' . $file->guessExtension();
    //   echo ($filename);
    //   $file->move(
    //     $uploads_directory,
    //     $filename
    //   );

    //   $player = $form->getData();
    //   $player->setProfileImage($filename);
    //   $service->save($player);

    //   return $this->redirectToRoute('player_list');
    // }

    // return $this->render('new.html.twig', array(
    //   'form' => $form->createView()
    // ));



    
  }

  /**
   * @Route("/api/player/{id}", name="player_show")
   */
  public function show(Player $player)
  {
    return $this->render('player/show.html.twig', array('player' => $player));
  }

  /**
   * @Route("/api/player/edit/{id}", name="edit_player")
   */
  public function edit(Player $player, Request $request, PlayerService $playerService, ValidatorInterface $validator)
  {
    $form = $this->createForm(PlayerType::class, $player);
    $form->handleRequest($request);

    if ($form->isSubmitted() && $form->isValid()) {
      $player = $form->getData();
      if ($form['profileImage']->getData()) {
        $file = $form['profileImage']->getData();
        $uploads_directory = $this->getParameter('uploads_directory');
        $filename = md5(uniqid()) . '.' . $file->guessExtension();
        $file->move(
          $uploads_directory,
          $filename
        );
        $player->setProfileImage($filename);
      }

      // $errors = $validator->validate($author);

      // if (count($errors) > 0) {
      //     /*
      //      * Uses a __toString method on the $errors variable which is a
      //      * ConstraintViolationList object. This gives us a nice string
      //      * for debugging.
      //      */
      //     $errorsString = (string) $errors;

      //     return new Response($errorsString);
      // }
      $playerService->update($player);

      return $this->redirectToRoute('player_list');
    }

    return $this->render('edit.html.twig', array(
      'form' => $form->createView()
    ));
  }

  /**
   * @Route("/api/player/delete/{id}", name="delete_player")
   */
  public function delete(Player $player, PlayerService $playerService)
  {
    if (!$player) {
      throw $this->createNotFoundException('The player does not exist');
    }
    $playerService->delete($player);
    $response = new Response();
    $response->send();
    return $response;
  }
}
