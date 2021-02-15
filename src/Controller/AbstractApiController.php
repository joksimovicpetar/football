<?php

declare(strict_types=1);

namespace App\Controller;

use FOS\RestBundle\Controller\AbstractFOSRestController;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Response;
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

abstract class AbstractApiController extends AbstractFOSRestController
{
    protected function buildForm(string $type, $data = null, array $options = []): FormInterface
    {
        $options = array_merge($options, [
           'csrf_protection' => false,
        ]);

        return $this->container->get('form.factory')->createNamed('', $type, $data, $options);
    }

    protected function respond($data, int $statusCode = Response::HTTP_OK): Response
    {

    // $classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
    // $normalizer = new ObjectNormalizer($classMetadataFactory);
    // $serializer = new Serializer([
    //     // Add a Datetimenormalizer as the first normalizer in the list
    //     new DatetimeNormalizer(),
    //     $normalizer
    // ], [new JsonEncoder()]);
    
    // $nesto =  $serializer->serialize($data, 'json', [
    //     // $serializer->addCircularReferenceHandler() IS DEPRECATED
    //     // define the handler like this:
    //     'circular_reference_handler' => function ($object) {
    //       return $object->getId();
    //     },
    //     'groups' => $groups
    // ]);
    return new Response($data, $statusCode, ['Content-Type' => 'application/json']);




        // $encoders = [new JsonEncoder()]; // If no need for XmlEncoder
        // $normalizers = [new DateTimeNormalizer(), new ObjectNormalizer()];
        // $serializer = new Serializer($normalizers, $encoders);
    
        // $jsonObject = $serializer->serialize($data, 'json', [
        //   'circular_reference_handler' => function ($object) {
        //     return $object->getId();
        //   },
        //   'groups' => 'non_sensitive_data'
        // ]);
        // // return $this->handleView($this->view($jsonObject, $statusCode));
        // return new Response($jsonObject, 200, ['Content-Type' => 'application/json']);

    }

    protected function serialize($data, $groups)
    {
    $classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
    $normalizer = new ObjectNormalizer($classMetadataFactory);
    $serializer = new Serializer([
        // Add a Datetimenormalizer as the first normalizer in the list
        new DatetimeNormalizer(),
        $normalizer
    ], [new JsonEncoder()]);
    
    $serializedData =  $serializer->serialize($data, 'json', [
        'circular_reference_handler' => function ($object) {
          return $object->getId();
        },
        'groups' => $groups
    ]);
    return $serializedData;




        // $encoders = [new JsonEncoder()]; // If no need for XmlEncoder
        // $normalizers = [new DateTimeNormalizer(), new ObjectNormalizer()];
        // $serializer = new Serializer($normalizers, $encoders);
    
        // $jsonObject = $serializer->serialize($data, 'json', [
        //   'circular_reference_handler' => function ($object) {
        //     return $object->getId();
        //   },
        //   'groups' => 'non_sensitive_data'
        // ]);
        // // return $this->handleView($this->view($jsonObject, $statusCode));
        // return new Response($jsonObject, 200, ['Content-Type' => 'application/json']);

    }
}