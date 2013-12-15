<?php

// TODO: Add proper documentation
namespace jsPowerAdmin\WebBundle\Controller;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use jsPowerAdmin\WebBundle\Output;
use jsPowerAdmin\WebBundle\Entity\Domains;
use jsPowerAdmin\WebBundle\Entity\Records;

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

    public function postAction() {
        // TODO: Add error handling (validation, duplicates, etc.).

        // Prepare request object, and get values.
        $name = $this->getRequest()->get( 'name' );
        // TODO: Validate!
        $type = $this->getRequest()->get( 'type' );

        // Create zone
        $zone = new Domains();
        $zone->setName( $name );
        $zone->setType( $type );

        // Save
        // TODO: Add cache handling?!
        $em = $this->getDoctrine()->getManager();
        $em->persist( $zone );
        $em->flush();

        return Output::format( array(
                $name
                ,$type
        ) );
    }

    public function deleteAction( $domainId ) {
        // TODO: Implement proper error handling!
        // Select zone.
        $zones = $this->getDoctrine()
                ->getRepository('jsPowerAdminWebBundle:Domains')
                ->findById( $domainId );

        // TODO: Add cache handling?!

        // Get entity manager
        $em = $this->getDoctrine()->getManager();

        // Delete related records!
        // TODO: Add limit!
        $query = $em->createQuery( 'DELETE FROM jsPowerAdmin\WebBundle\Entity\Records record WHERE record.domainId = :domain_id' );
        $query->setParameter( "domain_id", $domainId );
        $query->getResult();

        // Delete zone
        $em->remove( $zones[0] );
        $em->flush();

        return Output::format( array() );
    }
}
