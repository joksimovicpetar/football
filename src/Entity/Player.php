<?php

namespace App\Entity;

use App\Repository\PlayerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=PlayerRepository::class)
 * @ORM\HasLifecycleCallbacks()
 */
class Player
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"show_player"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Please specify first name")
     * @Groups({"show_player"})
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Please specify last name")
     * @Groups({"show_player"})
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Please specify personal Identifier number")
     * @Groups({"show_player"})
     */
    private $personalIdentifier;

    /**
     * @ORM\Column(type="date", nullable=true)
     * @Assert\NotBlank(message="Please specify date of birth")
     * @Groups({"show_player"})
     */
    private $dateOfBirth;

    /**
     * @ORM\Column(type="string", length=3)
     * @Assert\Choice(callback={"App\Entity\Position", "getPositions"})
     * @Groups({"show_player"})
     */
    private $position;

    /**
     * @ORM\ManyToOne(targetEntity=City::class, inversedBy="players")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"show_player"})
     */
    private $city;

    /**
     * @ORM\ManyToOne(targetEntity=Club::class, inversedBy="player")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"show_player"})
     */
    private $club;

    /**
     * @ORM\OneToMany(targetEntity=Performance::class, mappedBy="player")
     * @Groups({"show_player"})
     */
    private $performances;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"show_player"})
     */
    private $profileImage;

    public function __construct()
    {
        $this->performances = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getPersonalIdentifier(): ?string
    {
        return $this->personalIdentifier;
    }

    public function setPersonalIdentifier(string $personalIdentifier): self
    {
        $this->personalIdentifier = $personalIdentifier;

        return $this;
    }

    public function getDateOfBirth(): ?\DateTimeInterface
    {
        return $this->dateOfBirth;
    }

    public function setDateOfBirth(?\DateTimeInterface $dateOfBirth): self
    {
        $this->dateOfBirth = $dateOfBirth;

        return $this;
    }

    public function getPosition(): ?string
    {
        return $this->position;
    }

    public function setPosition(string $position): self
    {
        $this->position = $position;

        return $this;
    }

    public function getCity(): ?City
    {
        return $this->city;
    }

    public function setCity(?City $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getClub(): ?Club
    {
        return $this->club;
    }

    public function setClub(?Club $club): self
    {
        $this->club = $club;

        return $this;
    }

    /**
     * @return Collection|Performance[]
     */
    public function getPerformances(): Collection
    {
        return $this->performances;
    }

    public function addPerformance(Performance $performance): self
    {
        if (!$this->performances->contains($performance)) {
            $this->performances[] = $performance;
            $performance->setPlayer($this);
        }

        return $this;
    }

    public function removePerformance(Performance $performance): self
    {
        if ($this->performances->removeElement($performance)) {
            // set the owning side to null (unless already changed)
            if ($performance->getPlayer() === $this) {
                $performance->setPlayer(null);
            }
        }

        return $this;
    }

    public function getProfileImage(): ?string
    {
        return $this->profileImage;
    }

    public function setProfileImage(?string $profileImage): self
    {
        $this->profileImage = $profileImage;

        return $this;
    }
    
    /**
     * @ORM\PostRemove
     */
    public function postRemove(LifecycleEventArgs  $event) {
        $entity = $event->getEntity()->getProfileImage();
        $fs = new Filesystem();            
        $filename =  __DIR__ . "/../../public/uploads/" . $entity; // build the full path here
                if (file_exists($filename)) {
                    unlink($filename);
                    echo 'File ' . $filename . ' has been deleted';
                } else {
                    echo 'Could not delete ' . $filename . ', file does not exist';
                }
   }
}
