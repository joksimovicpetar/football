<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Form\UserType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use App\Service\UserService;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use Symfony\Component\Serializer\Mapping\Factory\ClassMetadataFactory;
use Symfony\Component\Serializer\NameConverter\CamelCaseToSnakeCaseNameConverter;
use Symfony\Component\Serializer\Normalizer\PropertyNormalizer;
use Doctrine\Common\Annotations\AnnotationReader;
use Symfony\Component\Serializer\Mapping\Loader\AnnotationLoader;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;



class UserController extends AbstractApiController
{
  /**
   * @Route("/api/user", methods={"GET"},  name="user_list")   
   * @IsGranted("IS_AUTHENTICATED_FULLY")
   * 
   */
  public function index(UserService $service)
  {
    $users = $service->findAll();
    $json = $this->serialize($users, ['show_user']);
    return $this->respond($json);
  }

  /**
   * @Route("/api/user/{email}", methods={"GET"} ,name="user_show" )
   */
  public function show(User $user)
  {
    $json = $this->serialize($user, ['show_user']);
    return $this->respond($json);
  }

  /**
   * * @Route("/api/user/delete/{id}", methods={"DELETE"} ,name="user_delete")
   * @ParamConverter("user", class="App:User")
   */
  public function delete(User $user, UserService $service)
  {
    $service->delete($user);
    return $this->respond(null, Response::HTTP_NO_CONTENT);
  }
}
