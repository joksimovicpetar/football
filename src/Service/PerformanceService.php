<?php 
namespace App\Service;
use App\Repository\PerformanceRepository;

class PerformanceService{
    private $repository;

    public function __construct(PerformanceRepository $repository)
    {
        $this->repository = $repository;
    }

    function save($performance) 
    {
        $this->repository->save($performance);
    }

    function update() 
    {
        $this->repository->update();
    }

    function delete($performance) 
    {
        $this->repository->delete($performance);
    }

    function findAll() 
    {
       $competitions = $this->repository->findAll();
       return $competitions;
    }
}