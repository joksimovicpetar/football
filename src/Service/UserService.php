<?php 
namespace App\Service;
use App\Repository\UserRepository;

class UserService{
    private $repository;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    function save($user) 
    {
        $this->repository->save($user);
    }

    function update($user) 
    {
        $this->repository->update($user);
    }

    function delete($user) 
    {
        $this->repository->delete($user);
    }

    function findAll() 
    {
       $users = $this->repository->findAll();
       return $users;
    }
}