<?php 
namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Club; //if you use entity for example Name
use App\Repository\ClubRepository;

class ClubService{
    private $em;
    public function __construct(ClubRepository $repository)
    {
        $this->repository = $repository;
    }

    function save($club) 
    {
        $this->repository->save($club);
    }

    function update($city) 
    {
        $this->repository->update($city);
    }

    function delete($club) 
    {
        $this->repository->delete($club);
    }

    function findAll() 
    {
       $clubs = $this->repository->findAll();
       return $clubs;
    }

    function find($id) 
    {
       $club = $this->repository->find($id);
       return $club;
    }
}