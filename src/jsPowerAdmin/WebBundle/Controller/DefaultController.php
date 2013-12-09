<?php

namespace jsPowerAdmin\WebBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {

        // Prepare UI specific configuration
        $configuration = $this->container->getParameter('js_power_admin_web.ui');

        return $this->render('jsPowerAdminWebBundle:Default:index.html.twig', array(
                "configuration" => $configuration
        ) );
    }
}
