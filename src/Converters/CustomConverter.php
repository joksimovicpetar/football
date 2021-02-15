<?php

namespace App\Converter;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Request\ParamConverter\ParamConverterInterface;

class CustomConverter implements ParamConverterInterface{
    function apply(Request $request, ParamConverter $configuration){
    }

    function supports(ParamConverter $configuration){

        return true;
    }
}
