<?php

// TODO: Add proper documentation
namespace jsPowerAdmin\WebBundle\Controller;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use jsPowerAdmin\WebBundle\Output;
use jsPowerAdmin\WebBundle\Entity\Records;
use jsPowerAdmin\WebBundle\Entity\Domains;

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

    public function putAction( $domainId, $recordId ) {

        // TODO: Add error handling (validation, duplicates, etc.).
        $records = $this->getDoctrine()
                ->getRepository( 'jsPowerAdminWebBundle:Records')
                ->findBy( array(
                        "domainId" => $domainId
                        ,"id" => $recordId
                ) );

        // Prepare request object, and get values.
        $name = $this->getRequest()->get( 'name' );
        // TODO: Validate!
        $type = $this->getRequest()->get( 'type' );
        $content = $this->getRequest()->get( 'content' );
        $priority = $this->getRequest()->get( 'prio' );
        $ttl = $this->getRequest()->get( 'ttl' );

        // Begin update.
        $record = $records[0];
        $record->setName( $name );
        $record->setType( $type );
        $record->setContent( $content );
        $record->setPrio( $priority );
        $record->setTtl( $ttl );
        $changeDate = time();
        $record->setChangeDate( $changeDate );

        // Save
        // TODO: Add cache handling?!
        $em = $this->getDoctrine()->getManager();
        $em->persist( $record );
        $em->flush();

        // TODO: Return 404 if not found.
        return Output::format( array(
                "name" => $name
                ,"type" => $type
                ,"content" => $content
                ,"prio" => $priority
                ,"ttl" => $ttl
                ,"changeDate" => $changeDate
        ) );
    }

    public function postAction( $domainId ) {
        // TODO: Add error handling (validation, duplicates, etc.).

        // Prepare request object, and get values.
        $name = $this->getRequest()->get( 'name' );
        // TODO: Validate!
        $type = $this->getRequest()->get( 'type' );
        $content = $this->getRequest()->get( 'content' );
        $priority = $this->getRequest()->get( 'prio' );
        $ttl = $this->getRequest()->get( 'ttl' );

        // Get associated domain
        // TODO: Handle missing domain.
        $zones = $this->getDoctrine()
                ->getRepository('jsPowerAdminWebBundle:Domains')
                ->findById( $domainId );

        // Create record
        $record = new Records();
        $record->setName( $name );
        $record->setType( $type );
        $record->setContent( $content );
        $record->setPrio( $priority );
        $record->setTtl( $ttl );
        $record->setDomain( $zones[0] );
        $changeDate = time();
        $record->setChangeDate( $changeDate );

        // Save
        // TODO: Add cache handling?!
        $em = $this->getDoctrine()->getManager();
        $em->persist( $record );
        $em->flush();

        return Output::format( array(
                "name" => $name
                ,"type" => $type
                ,"content" => $content
                ,"prio" => $priority
                ,"ttl" => $ttl
                ,"changeDate" => $changeDate
        ) );
    }

    public function deleteAction( $domainId, $recordId ) {
        // TODO: Implement proper error handling!
        $records = $this->getDoctrine()
                ->getRepository( 'jsPowerAdminWebBundle:Records')
                ->findBy( array(
                        "domainId" => $domainId
                        ,"id" => $recordId
                ) );

        // TODO: Add cache handling?!
        // TODO: Delete related records!
        $em = $this->getDoctrine()->getManager();
        $em->remove( $records[0] );
        $em->flush();

        return Output::format( array() );
    }
}
