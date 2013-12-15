<?php

// TODO: Add proper documentation.
namespace jsPowerAdmin\WebBundle;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\HttpFoundation\Response;

// NOTE: Acts as normalizer!
class Output implements NormalizerInterface {
        public static function format( array $output ) {
                // TODO: Remove redundant code.
                // Create Json Encoder
                $encoders = array(
                        new JsonEncoder()
                );

                // Create normalizer (self).
                $normalizers = array(
                        new self()
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

        // TODO: Document.
        // NOTE: Does not normalize child objects.
        public function normalize( $object, $format = null, array $context = array() ) {
                // If array, return as is
                if ( is_array( $object ) ) {
                        return $object;
                }

                // Prepare result
                $result = array();

                // Get reflection class
                $reflectionObject = new \ReflectionObject( $object );

                // Get public methods
                $methods = $reflectionObject->getMethods( \ReflectionMethod::IS_PUBLIC );

                // "Get" only getter results
                foreach ( $methods as $method ) {
                        if ( substr( $method->name, 0, 3 ) == "get" && is_scalar( $object->{$method->name}() ) ) {
                                $result[lcfirst( substr( $method->name, 3 ) )] = $object->{$method->name}();
                        }
                }

                return (object) $result;
        }

        // TODO: Document.
        public function supportsNormalization( $data, $format = null ) {
                // Only normalize objects and arrays, in json format.
                if ( ( is_object( $data ) || is_array( $data ) ) && $format == "json" ) {
                        return true;
                }
                return false;
        }
}