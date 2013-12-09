<?php

// TODO: Add proper documentation
namespace jsPowerAdmin\WebBundle\Controller;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;


class RecordsController extends Controller
{
    public function getAction()
    {
        // Create Json Encoder
        $encoders = array(
                new JsonEncoder()
        );

        // Create normalizer
        $normalizers = array(
                new GetSetMethodNormalizer()
        );

        // Prepare resializer
        $serializer = new Serializer(
                $normalizers
                ,$encoders
        );

        // Prepare content
        $jsonContent = $serializer->serialize(
                // TODO: Add real data.
                array(
                        "data" => array(
                                        "id" => 1
                                        ,"name" => "www.test.com"
                                        // TODO: Use ids for types
                                        ,"type" => "A"
                                        ,"content" => "127.0.0.1"
                                        ,"priority" => 1
                                        ,"ttl" => 86400
                                )
                )
                ,'json'
        );

        // Create response object.
        $response = new Response($jsonContent);
        // Set content type.
        $response->headers->set('Content-Type', 'application/json');
        // Return response.
        return $response;
    }

    public function putAction() {
        // TODO: Implement and remove redundant code!
        // Create Json Encoder
        $encoders = array(
                new JsonEncoder()
        );

        // Create normalizer
        $normalizers = array(
                new GetSetMethodNormalizer()
        );

        // Prepare resializer
        $serializer = new Serializer(
                $normalizers
                ,$encoders
        );

        // TODO: Implement and remove redundant code!
        // Create response object.
        $response = new Response($serializer->serialize(array(),'json'));
        // Set content type.
        $response->headers->set('Content-Type', 'application/json');
        // Return response.
        return $response;
    }

    public function postAction() {
        // TODO: Implement and remove redundant code!
        // Create Json Encoder
        $encoders = array(
                new JsonEncoder()
        );

        // Create normalizer
        $normalizers = array(
                new GetSetMethodNormalizer()
        );

        // Prepare resializer
        $serializer = new Serializer(
                $normalizers
                ,$encoders
        );

        // TODO: Implement and remove redundant code!
        // Create response object.
        $response = new Response($serializer->serialize(array(),'json'));
        // Set content type.
        $response->headers->set('Content-Type', 'application/json');
        // Return response.
        return $response;
    }

    public function deleteAction() {
        // TODO: Implement and remove redundant code!
        // Create Json Encoder
        $encoders = array(
                new JsonEncoder()
        );

        // Create normalizer
        $normalizers = array(
                new GetSetMethodNormalizer()
        );

        // Prepare resializer
        $serializer = new Serializer(
                $normalizers
                ,$encoders
        );

        // Create response object.
        $response = new Response($serializer->serialize(array(),'json'));
        // Set content type.
        $response->headers->set('Content-Type', 'application/json');
        // Return response.
        return $response;
    }
}
