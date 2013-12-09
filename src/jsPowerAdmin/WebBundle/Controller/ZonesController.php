<?php

// TODO: Add proper documentation
namespace jsPowerAdmin\WebBundle\Controller;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use jsPowerAdmin\WebBundle\Output;

class ZonesController extends Controller
{
    public function getAction()
    {
        // TODO: Implement.
        return Output::format( // TODO: Add real data.
                array(
                        "data" => array(
                                        "id" => 1
                                        ,"name" => "test.com"
                                        // TODO: Use ids for types
                                        ,"type" => "master"
                                        ,"records" => 1
                                )
                )
        );
    }

    public function putAction() {
        // TODO: Implement.
        return Output::format( array() );
    }

    public function postAction() {
        // TODO: Implement.
        return Output::format( array() );
    }

    public function deleteAction() {
        // TODO: Implement.
        return Output::format( array() );
    }
}
