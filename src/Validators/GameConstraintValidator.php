<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;

class DifferentHostAndGuestValidator extends ConstraintValidator
{
    public function validate($protocol, Constraint $constraint)
    {
        
        
        if ($protocol->getHost() == $protocol->getGuest()) {
            echo($protocol->getHost()->getName());
            $this->context->buildViolation($constraint->message)
                ->atPath('guest')
                ->addViolation();
        }
        
        if (!$constraint instanceof DifferentHostAndGuest) {
            throw new UnexpectedTypeException($constraint, DifferentHostAndGuest::class);
        }

    }
}