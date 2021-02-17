<?php 
namespace App\Service;
use App\Repository\CityRepository;

class CityService{
    private $repository;

    public function __construct(CityRepository $repository)
    {
        $this->repository = $repository;
    }

    function save($city) 
    {
        $this->repository->save($city);
    }

    function update($city) 
    {
        $this->repository->update($city);
    }

    function delete($city) 
    {
        $this->repository->delete($city);
    }

    function findAll() 
    {
       $cities = $this->repository->findAll();
       return $cities;
    }

    function find($id) 
    {
       $city = $this->repository->find($id);
       return $city;
    }
}