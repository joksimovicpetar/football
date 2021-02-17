<?php 
namespace App\Service;
use App\Repository\GameRepository;

class GameService{
    private $repository;

    public function __construct(GameRepository $repository)
    {
        $this->repository = $repository;
    }

    function save($game) 
    {
        $this->repository->save($game);
    }

    function update() 
    {
        $this->repository->update();
    }

    function delete($game) 
    {
        $this->repository->delete($game);
    }

    function findAll() 
    {
       $games = $this->repository->findAll();
       return $games;
    }

    function find($id) 
    {
       $game = $this->repository->find($id);
       return $game;
    }
}