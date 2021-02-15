<?php

namespace App\Entity;

use App\Repository\ClubRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=ClubRepository::class)
 */
class Club
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"show_club"})

     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"show_club"})
     */
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity=Player::class, inversedBy="club")
     * @Groups({"show_club"})
     */
    private $player;

    /**
     * @ORM\OneToMany(targetEntity=Game::class, mappedBy="host")
     * @Groups({"show_club"})
     */
    private $hostGames;

    /**
     * @ORM\OneToMany(targetEntity=Game::class, mappedBy="guest")
     * @Groups({"show_club"})
     */
    private $guestGames;

    public function __construct()
    {
        $this->hostGames = new ArrayCollection();
        $this->guestGames = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getPlayer(): ?Player
    {
        return $this->player;
    }

    public function setPlayer(?Player $player): self
    {
        $this->player = $player;

        return $this;
    }

    /**
     * @return Collection|Game[]
     */
    public function getHostGames(): Collection
    {
        return $this->hostGames;
    }

    public function addHostGame(Game $hostGame): self
    {
        if (!$this->hostGames->contains($hostGame)) {
            $this->hostGames[] = $hostGame;
            $hostGame->setHost($this);
        }

        return $this;
    }

    public function removeGame(Game $game): self
    {
        if ($this->games->removeElement($game)) {
            // set the owning side to null (unless already changed)
            if ($game->getHost() === $this) {
                $game->setHost(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Game[]
     */
    public function getGuestGames(): Collection
    {
        return $this->guestGames;
    }

    public function addGuestGame(Game $guestGame): self
    {
        if (!$this->guestGames->contains($guestGame)) {
            $this->guestGames[] = $guestGame;
            $guestGame->setGuest($this);
        }

        return $this;
    }

    public function removeGuestGame(Game $guestGame): self
    {
        if ($this->guestGames->removeElement($guestGame)) {
            // set the owning side to null (unless already changed)
            if ($guestGame->getGuest() === $this) {
                $guestGame->setGuest(null);
            }
        }

        return $this;
    }
}
