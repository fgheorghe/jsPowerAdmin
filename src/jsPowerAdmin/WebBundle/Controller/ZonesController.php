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
        // Select zones.
        $zones = $this->getDoctrine()
                ->getRepository('jsPowerAdminWebBundle:Domains')
                ->findAll();

        // Format output and return.
        return Output::format(
                array(
                        "data" => $zones
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
