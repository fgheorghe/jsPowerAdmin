<?php

namespace jsPowerAdmin\WebBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Records
 *
 * @ORM\Table(name="records")
 * @ORM\Entity
 */
class Records
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
     * @var integer
     *
     * @ORM\Column(name="domain_id", type="integer", nullable=true)
     */
    private $domainId;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255, nullable=true)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=10, nullable=true)
     */
    private $type;

    /**
     * @var string
     *
     * @ORM\Column(name="content", type="string", length=64000, nullable=true)
     */
    private $content;

    /**
     * @var integer
     *
     * @ORM\Column(name="ttl", type="integer", nullable=true)
     */
    private $ttl;

    /**
     * @var integer
     *
     * @ORM\Column(name="prio", type="integer", nullable=true)
     */
    private $prio;

    /**
     * @var integer
     *
     * @ORM\Column(name="change_date", type="integer", nullable=true)
     */
    private $changeDate;

    /**
     * @var object
     */
    private $domain; // NOTE: Not publicly used!

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
     * Set domain
     *
     * @param object $domain
     * @return Records
     */
    public function setDomain($domain)
    {
        $this->domain = $domain;

        return $this;
    }

    /**
     * Get domain
     *
     * @return object
     */
    public function getDomain()
    {
        return $this->domain;
    }

    /**
     * Set domainId
     *
     * @param integer $domainId
     * @return Records
     */
    public function setDomainId($domainId)
    {
        $this->domainId = $domainId;

        return $this;
    }

    /**
     * Get domainId
     *
     * @return integer 
     */
    public function getDomainId()
    {
        return $this->domainId;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Records
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
     * Set type
     *
     * @param string $type
     * @return Records
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
     * Set content
     *
     * @param string $content
     * @return Records
     */
    public function setContent($content)
    {
        $this->content = $content;

        return $this;
    }

    /**
     * Get content
     *
     * @return string 
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * Set ttl
     *
     * @param integer $ttl
     * @return Records
     */
    public function setTtl($ttl)
    {
        $this->ttl = $ttl;

        return $this;
    }

    /**
     * Get ttl
     *
     * @return integer 
     */
    public function getTtl()
    {
        return $this->ttl;
    }

    /**
     * Set prio
     *
     * @param integer $prio
     * @return Records
     */
    public function setPrio($prio)
    {
        $this->prio = $prio;

        return $this;
    }

    /**
     * Get prio
     *
     * @return integer 
     */
    public function getPrio()
    {
        return $this->prio;
    }

    /**
     * Set changeDate
     *
     * @param integer $changeDate
     * @return Records
     */
    public function setChangeDate($changeDate)
    {
        $this->changeDate = $changeDate;

        return $this;
    }

    /**
     * Get changeDate
     *
     * @return integer 
     */
    public function getChangeDate()
    {
        return $this->changeDate;
    }
}
