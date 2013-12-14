<?php

namespace jsPowerAdmin\WebBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {

        // Prepare UI specific configuration
        $configuration = $this->container->getParameter('js_power_admin_web.ui');

        // Pass on the isDebug kernel value
        // If enabled, ExtJS will be loaded via a CDN.
        // See: services.yml for CDN path configuration.
        $isDebug = $this->get( 'kernel' )->isDebug();

        return $this->render('jsPowerAdminWebBundle:Default:index.html.twig', array(
                "configuration" => $configuration
                ,"isDebug" => $isDebug
        ) );
    }
}
