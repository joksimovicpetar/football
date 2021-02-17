<?php 
namespace App\Service;
use App\Repository\CompetitionRepository;

class CompetitionService{
    private $repository;

    public function __construct(CompetitionRepository $repository)
    {
        $this->repository = $repository;
    }

    function save($competition) 
    {
        $this->repository->save($competition);
    }

    function update($competition) 
    {
        $this->repository->update();
    }

    function delete($competition) 
    {
        $this->repository->delete($competition);
    }

    function findAll() 
    {
       $competitions = $this->repository->findAll();
       return $competitions;
    }

    function find($id) 
    {
       $competition = $this->repository->find($id);
       return $competition;
    }
}