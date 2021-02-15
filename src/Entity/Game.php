<?php

namespace App\Entity;

use App\Repository\GameRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Validator as AcmeAssert;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=GameRepository::class)
 * @AcmeAssert\DifferentHostAndGuest
 */
class Game
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"show_game", "show_performance"})
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     * @Groups({"show_game", "show_competition", "show_performance"})
     */
    private $date;

    /**
     * @ORM\ManyToOne(targetEntity=Competition::class, inversedBy="games")
     * @Groups({"show_game", "show_competition"})
     */
    private $competition;

    /**
     * @ORM\OneToMany(targetEntity=Performance::class, mappedBy="game", orphanRemoval=true)
     * @Groups({"show_game"})
     */
    private $performances;

    /**
     * @ORM\ManyToOne(targetEntity=Club::class, inversedBy="games")
     * @Groups({"show_game"})
     */
    private $host;

    /**
     * @ORM\ManyToOne(targetEntity=Club::class, inversedBy="guestGames")
     * @Groups({"show_game"})
     */
    private $guest;

    public function __construct()
    {
        $this->performances = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getCompetition(): ?Competition
    {
        return $this->competition;
    }

    public function setCompetition(?Competition $competition): self
    {
        $this->competition = $competition;

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
            $performance->setGame($this);
        }

        return $this;
    }

    public function removePerformance(Performance $performance): self
    {
        if ($this->performances->removeElement($performance)) {
            // set the owning side to null (unless already changed)
            if ($performance->getGame() === $this) {
                $performance->setGame(null);
            }
        }

        return $this;
    }

    public function getHost(): ?Club
    {
        return $this->host;
    }

    public function setHost(?Club $host): self
    {
        $this->host = $host;

        return $this;
    }

    public function getGuest(): ?Club
    {
        return $this->guest;
    }

    public function setGuest(?Club $guest): self
    {
        $this->guest = $guest;

        return $this;
    }

    public function __toString()
    {
        // TODO: Implement __toString() method.

       return $this->getId();
    }
}
