<?php

// TODO: Add proper documentation
namespace jsPowerAdmin\WebBundle\Controller;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;


class ZonesController extends Controller
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
                                        ,"name" => "test.com"
                                        // TODO: Use ids for types
                                        ,"type" => "master"
                                        ,"records" => 1
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
}
