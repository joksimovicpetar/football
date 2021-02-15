<?php

namespace App\Entity;

use App\Repository\CityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\Ignore;
use Symfony\Component\Serializer\Annotation\MaxDepth;

/**
 * @ORM\Entity(repositoryClass=CityRepository::class)
 */
class City
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"show_city"})
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"show_city"})
     */
    private $zip;

    /**
     * @ORM\Column(type="string", length=180)
     * @Groups({"show_city"})
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity=Player::class, mappedBy="city", orphanRemoval=true)
     * @Groups({"show_city"})
     */
    private $players;

    public function __construct()
    {
        $this->players = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getZip(): ?string
    {
        return $this->zip;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setZip(string $zip): self
    {
        $this->zip = $zip;

        return $this;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|Player[]
     */
    public function getPlayers(): Collection
    {
        return $this->players;
    }

    public function addPlayer(Player $player): self
    {
        if (!$this->players->contains($player)) {
            $this->players[] = $player;
            $player->setCity($this);
        }

        return $this;
    }

    public function removePlayer(Player $player): self
    {
        if ($this->players->removeElement($player)) {
            // set the owning side to null (unless already changed)
            if ($player->getCity() === $this) {
                $player->setCity(null);
            }
        }

        return $this;
    }
}
