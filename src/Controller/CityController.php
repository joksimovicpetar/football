<?php

namespace App\Controller;

use App\Entity\City;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Form\CityType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use App\Service\CityService;
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



class CityController extends AbstractApiController
{
  /**
   * @Route("/api/city", methods={"GET"},  name="city_list")   
   * @IsGranted("IS_AUTHENTICATED_FULLY")
   * 
   */
  public function index(CityService $service)
  {
    $cities = $service->findAll();
    $json = $this->serialize($cities, ['show_city']);
    return $this->respond($json);
  }

  /**
   * @Route("/api/city/new", methods={"POST"}, name="new_city") 
   *  @ParamConverter("city", converter="fos_rest.request_body")
   */
  public function new(City $city, Request $request, CityService $service)
  {
    $form = $this->buildForm(CityType::class, $city);

    $form->handleRequest($request);

    if (!$form->isSubmitted() || !$form->isValid()) {
      return $this->respond($form, Response::HTTP_BAD_REQUEST);
    }

    $city = $form->getData();
    $service->save($city);

    $json = $this->serialize($city, ['show_city']);
    return $this->respond($json, Response::HTTP_CREATED);
  }

  /**
   * @Route("/api/city/edit/{id}", methods={"GET", "POST", "PUT"} ,name="edit_city" )   
   * @ParamConverter("city", class="App:City")
   */
  public function edit(City $city, Request $request, CityService $service)
  {
    if (!$city) {
      throw new NotFoundHttpException('City not found');
    }

    $form = $this->buildForm(CityType::class, $city);
    $form->handleRequest($request);

    if (!$form->isSubmitted() || !$form->isValid()) {
      return $this->respond($form, Response::HTTP_BAD_REQUEST);
    }

    $city = $form->getData();
    $service->update($city);

    $json = $this->serialize($city, ['show_city']);
    return $this->respond($json);
  }

  /**
   * @Route("/api/city/{id}", methods={"GET"} ,name="city_show" )
   * @ParamConverter("city", class="App:City")
   */
  public function show(City $city)
  {
    $json = $this->serialize($city, ['show_city']);
    return $this->respond($json);
  }

  /**
   * * @Route("/api/city/delete/{id}", methods={"DELETE"} ,name="city_delete")
   * @ParamConverter("city", class="App:City")
   */
  public function delete(City $city, CityService $service)
  {
    $service->delete($city);
    return $this->respond(null, Response::HTTP_NO_CONTENT);
  }
}
