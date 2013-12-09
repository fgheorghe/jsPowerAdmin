<?php

// TODO: Add proper documentation.
namespace jsPowerAdmin\WebBundle;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;
use Symfony\Component\HttpFoundation\Response;

class Output {
        public static function format( array $output ) {
                // TODO: Remove redundant code.
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
                $response = new Response($serializer->serialize($output,'json'));
                // Set content type.
                // TODO: Include response HTTP code.
                $response->headers->set('Content-Type', 'application/json');

                // Return response.
                return $response;
        }
}