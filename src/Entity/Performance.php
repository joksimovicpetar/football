<?php

namespace App\Entity;

use App\Repository\PerformanceRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=PerformanceRepository::class)
 */
class Performance
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"show_performance"})

     */
    private $id;

    /**
     * @ORM\Column(type="decimal", precision=10, scale=0, nullable=true)
     * @Groups({"show_performance"})
     */
    private $playerPerformance;

    /**
     * @ORM\ManyToOne(targetEntity=Player::class, inversedBy="performances")
     * @ORM\JoinColumn(name="player_id", referencedColumnName="id", nullable=FALSE)
     * @Groups({"show_performance"})
     */
    private $player;

    /**
     * @ORM\ManyToOne(targetEntity=Game::class, inversedBy="performances")
     * @ORM\JoinColumn(name="game_id", referencedColumnName="id", nullable=FALSE)
     * @Groups({"show_performance"})
     */
    private $game;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPlayerPerformance(): ?string
    {
        return $this->playerPerformance;
    }

    public function setPlayerPerformance(?string $playerPerformance): self
    {
        $this->playerPerformance = $playerPerformance;

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

    public function getGame(): ?Game
    {
        return $this->game;
    }

    public function setGame(?Game $game): self
    {
        $this->game = $game;

        return $this;
    }
}
