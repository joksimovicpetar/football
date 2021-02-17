<?php

namespace App\Controller;

use App\Entity\Performance;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Form\PerformanceType;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use App\Repository\PerformanceRepository;
use App\Service\GameService;
use App\Service\PerformanceService;
use App\Service\PlayerService;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PerformanceController extends AbstractApiController
{
    /**
    * @Route("/api/performance", methods={"GET"},  name="performance_list")   
     */
    public function index(PerformanceService $service): Response
    {
        $performances = $service->findAll();
        $json = $this->serialize($performances, ['show_performance', 'show_player']);
        return $this->respond($json);
    }

    /**
     * @Route("/api/performance/new", methods={"POST"}, name="new_performance") 
   *  @ParamConverter("performance", converter="fos_rest.request_body")

     */
    public function new(Performance $performance, Request $request, PerformanceService $service, PlayerService $playerService, GameService $gameService)
    {

      $parameters = json_decode($request->getContent(), true);
      // echo($content['host']);
      $player = $playerService->find($parameters['player']);
      $game = $gameService->find($parameters['game']);
      // $game = ($parameters['game']);
      $performance = new Performance();
      $performance->setPlayer($player);
      $performance->setGame($game);
      $performance->setPlayerPerformance($parameters['playerPerformance']);

  
      // $form = $this->buildForm(CompetitionType::class, $competition);
      // $form->handleRequest($request);
  
      // if (!$form->isSubmitted() || !$form->isValid()) {
      //   return $this->respond($form, Response::HTTP_BAD_REQUEST);
      // }
  
      // $competition = $form->getData();
      // echo($name);
      $service->save($performance);

        // $form = $this->buildForm(PerformanceType::class, $performance);

        // $form->handleRequest($request);
    
        // if (!$form->isSubmitted() || !$form->isValid()) {
        //   return $this->respond($form, Response::HTTP_BAD_REQUEST);
        // }
    
        // $performance = $form->getData();
        // $service->save($performance);
    
        $json = $this->serialize($performance, ['show_performance']);
        return $this->respond($json, Response::HTTP_CREATED);
    }
    
    /**
    * @Route("/api/performance/edit/{id}", methods={"GET", "POST", "PUT"} ,name="edit_performance" )   
    * @ParamConverter("performance", class="App:Performance")
    */
   public function edit(Performance $performance, Request $request, PerformanceService $service)
   {
     if (!$performance) {
       throw new NotFoundHttpException('Performance not found');
     }
 
     $form = $this->buildForm(PerformanceType::class, $performance);
     $form->handleRequest($request);
 
     if (!$form->isSubmitted() || !$form->isValid()) {
       return $this->respond($form, Response::HTTP_BAD_REQUEST);
     }
 
     $performance = $form->getData();
     $service->update($performance);
 
     $json = $this->serialize($performance, ['show_performance']);
        return $this->respond($json);
   }
 
   /**
    * @Route("/api/performance/{id}", methods={"GET"} ,name="performance_show" )
    * @ParamConverter("performance", class="App:Performance")
    */
   public function show(Performance $performance)
   {
    $json = $this->serialize($performance, ['show_performance', 'show_player']);
    return $this->respond($json);
   }
 
   /**
    * * @Route("/api/performance/delete/{id}", methods={"DELETE"} ,name="performance_delete")
    * @ParamConverter("performance", class="App:Performance")
    */
   public function delete(Performance $performance, PerformanceService $service)
   {
     $service->delete($performance);
     return $this->respond(null, Response::HTTP_NO_CONTENT);
   }






    // public function index2(Request $request, PerformanceService $performanceService)
    // {
    //     $data = json_decode($request->getContent());
    //     var_dump($data->player_id);

    //     // var_dump($data);
    //     $performance = new Performance();
    //     $form = $this->createForm(PerformanceType::class, $performance);
    //     echo ('1');

    //     if ($request->isMethod('POST')) {
    //         // var_dump($data);
    //         echo ('12');

    //         $form->submit($data);
    //         // var_dump($form);
    //         echo ('13');
    //         // && $form->isValid()
    //         if ($form->isSubmitted()) {
    //             echo ('14');

    //             // perform some action...
    //             $performanceService->save($performance);
    //             echo ('15');

    //             return new Response('It worked. Believe me - I\'m an API', 201);
    //         } else {
    //             echo ('f1');
    //         }
    //     }
    //     // $form->submit($data);
    //     // if($form->isSubmitted()&&$form->isValid()){
    //     //     $em=$this->getDoctrine()->getManager();
    //     //     $em->persist($performance);
    //     //     $em->flush();

    //     //     return new Response('It worked. Believe me - I\'m an API', 201);
    //     // }


    //     return $this->render('performance/test.html.twig', [
    //         'form' => $form->createView()
    //     ]);
    //     //   return $this->render('new.html.twig', [
    //     //     'form' => $form->createView()
    //     //   ]);



    //     // return $this->render('new.html.twig', [
    //     //     'form' => $form->createView()
    //     //   ]);
    //     // // $performance->setUser($this->findUserByUsername('weaverryan'));
    //     // $em = $this->getDoctrine()->getManager();

    //     // $em->persist($performance);
    //     // $em->flush();
    //     return new Response('It worked. Believe me - I\'m an API', 201);


    //     // $club = new Performance();

    //     //   $form = $this->createForm(PerformanceType::class, $club);

    //     //   $form->handleRequest($request);

    //     //    if($form->isSubmitted() && $form->isValid()) {
    //     //     $club = $form->getData();

    //     //     $em->persist($club);
    //     //     $em->flush();

    //     //     return $this->redirectToRoute('performance_list');
    //     //   }

    //     //   return $this->render('performance/test.html.twig', [
    //     //     'form' => $form->createView()
    //     //   ]);
    // }
    // /**
    //  * @Route("/performance/new3", name="new_3_performance")
    //  *      * Method({"GET"})

    //  */
    // public function index3(Request $request, EntityManagerInterface $em)
    // {
    //     // $data = json_decode($request->getContent());
    //     // var_dump($data->player_id);

    //     // var_dump($data);
    //     $performance = new Performance();
    //     $form = $this->createForm(PerformanceType::class, $performance);
    //     echo ('1');

    //     // if ($request->isMethod('POST')) {
    //     //     // var_dump($data);
    //     //     echo('12');

    //     //     $form->submit($data);
    //     //     // var_dump($form);
    //     //     echo('13');
    //     //     // && $form->isValid()
    //     //     if ($form->isSubmitted())   {
    //     //         echo('14');

    //     //         // perform some action...
    //     //             $em=$this->getDoctrine()->getManager();
    //     //             $em->persist($performance);
    //     //             $em->flush();
    //     //             echo('15');

    //     //         return new Response('It worked. Believe me - I\'m an API', 201);
    //     //     } else {
    //     //         echo('f1');

    //     //     }
    //     // }        
    //     // $form->submit($.);
    //     // if($form->isSubmitted()&&$form->isValid()){
    //     //     $em=$this->getDoctrine()->getManager();
    //     //     $em->persist($performance);
    //     //     $em->flush();

    //     //     return new Response('It worked. Believe me - I\'m an API', 201);
    //     // }


    //     return $this->render('performance/test.html.twig', [
    //         'form' => $form->createView()
    //     ]);
    //     //   return $this->render('new.html.twig', [
    //     //     'form' => $form->createView()
    //     //   ]);



    //     // return $this->render('new.html.twig', [
    //     //     'form' => $form->createView()
    //     //   ]);
    //     // // $performance->setUser($this->findUserByUsername('weaverryan'));
    //     // $em = $this->getDoctrine()->getManager();

    //     // $em->persist($performance);
    //     // $em->flush();
    //     return new Response('It worked. Believe me - I\'m an API', 201);


    //     // $club = new Performance();

    //     //   $form = $this->createForm(PerformanceType::class, $club);

    //     //   $form->handleRequest($request);

    //     //    if($form->isSubmitted() && $form->isValid()) {
    //     //     $club = $form->getData();

    //     //     $em->persist($club);
    //     //     $em->flush();

    //     //     return $this->redirectToRoute('performance_list');
    //     //   }

    //     //   return $this->render('performance/test.html.twig', [
    //     //     'form' => $form->createView()
    //     //   ]);
    // }






    // /* @Route("/performance/new", name="new_performance")
    //  * Method({"GET", "POST"})
    //  */
    // public function new(Request $request, PerformanceService $performanceService)
    // {

    //     return $this->render('performance/index.html.twig', [
    //         'controller_name' => 'PerformanceController',
    //     ]);
    //     //   $club = new Performance();

    //     //   $form = $this->createForm(PerformanceType::class, $club);

    //     //   $form->handleRequest($request);

    //     //    if($form->isSubmitted() && $form->isValid()) {
    //     //     $club = $form->getData();

    //     //     $em->persist($club);
    //     //     $em->flush();

    //     //     return $this->redirectToRoute('performance_list');
    //     //   }

    //     //   return $this->render('new.html.twig', [
    //     //     'form' => $form->createView()
    //     //   ]);
    // }
}
