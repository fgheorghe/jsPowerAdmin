<?php

namespace jsPowerAdmin\WebBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('jsPowerAdminWebBundle:Default:index.html.twig', array('name' => $name));
    }
}
