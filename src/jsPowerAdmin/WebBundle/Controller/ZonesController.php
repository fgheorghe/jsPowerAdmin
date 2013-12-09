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
        // TODO: Add error handling (validation, duplicates, etc.).

        // Prepare type mapping
        $uiConfiguration = $this->container->getParameter('js_power_admin_web.ui');

        // Prepare request object, and get values.
        $name = $this->getRequest()->get( 'name' );
        // TODO: Validate.
        $type = $uiConfiguration["master_zone_types"][$this->getRequest()->get( 'type' ) - 1]["type"];

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
        // TODO: Delete related records!
        $em = $this->getDoctrine()->getManager();
        $em->remove( $zones[0] );
        $em->flush();

        return Output::format( array() );
    }
}
