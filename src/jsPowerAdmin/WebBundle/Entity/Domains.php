<?php

namespace jsPowerAdmin\WebBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Domains
 *
 * @ORM\Table(name="domains")
 * @ORM\Entity
 */
class Domains
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255, nullable=false)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="master", type="string", length=128, nullable=true)
     */
    private $master;

    /**
     * @var integer
     *
     * @ORM\Column(name="last_check", type="integer", nullable=true)
     */
    private $lastCheck;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=6, nullable=false)
     */
    private $type;

    /**
     * @var integer
     *
     * @ORM\Column(name="notified_serial", type="integer", nullable=true)
     */
    private $notifiedSerial;

    /**
     * @var string
     *
     * @ORM\Column(name="account", type="string", length=40, nullable=true)
     */
    private $account;



    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Domains
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set master
     *
     * @param string $master
     * @return Domains
     */
    public function setMaster($master)
    {
        $this->master = $master;

        return $this;
    }

    /**
     * Get master
     *
     * @return string 
     */
    public function getMaster()
    {
        return $this->master;
    }

    /**
     * Set lastCheck
     *
     * @param integer $lastCheck
     * @return Domains
     */
    public function setLastCheck($lastCheck)
    {
        $this->lastCheck = $lastCheck;

        return $this;
    }

    /**
     * Get lastCheck
     *
     * @return integer 
     */
    public function getLastCheck()
    {
        return $this->lastCheck;
    }

    /**
     * Set type
     *
     * @param string $type
     * @return Domains
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string 
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set notifiedSerial
     *
     * @param integer $notifiedSerial
     * @return Domains
     */
    public function setNotifiedSerial($notifiedSerial)
    {
        $this->notifiedSerial = $notifiedSerial;

        return $this;
    }

    /**
     * Get notifiedSerial
     *
     * @return integer 
     */
    public function getNotifiedSerial()
    {
        return $this->notifiedSerial;
    }

    /**
     * Set account
     *
     * @param string $account
     * @return Domains
     */
    public function setAccount($account)
    {
        $this->account = $account;

        return $this;
    }

    /**
     * Get account
     *
     * @return string 
     */
    public function getAccount()
    {
        return $this->account;
    }
}
