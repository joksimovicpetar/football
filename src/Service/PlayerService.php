<?php 
namespace App\Service;
use App\Repository\PlayerRepository;

class PlayerService{
    private $repository;

    public function __construct(PlayerRepository $repository)
    {
        $this->repository = $repository;
    }

    function save($player) 
    {
        $this->repository->save($player);
    }

    function update() 
    {
        $this->repository->update();
    }

    function delete($player) 
    {
        $this->repository->delete($player);
    }

    function findAll() 
    {
       $competitions = $this->repository->findAll();
       return $competitions;
    }
}