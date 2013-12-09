<?php

// TODO: Add proper documentation
namespace jsPowerAdmin\WebBundle\Controller;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use jsPowerAdmin\WebBundle\Output;

class RecordsController extends Controller
{
    public function getAction( $domainId )
    {
        // Select records.
        // TODO: Add record count.
        $records = $this->getDoctrine()
                ->getRepository( 'jsPowerAdminWebBundle:Records')
                ->findBy( array(
                        "domainId" => $domainId
                ) );

        // Format output and return.
        // TODO: Return 404 if none found for this domain.
        return Output::format(
                array(
                        "data" => $records
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
