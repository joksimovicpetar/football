<?php
namespace App\Validator;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class DifferentHostAndGuest extends Constraint
{
    public $message = 'A game cannot have the same host and guest team.';

    public function getTargets()
{
    return self::CLASS_CONSTRAINT;
}
}