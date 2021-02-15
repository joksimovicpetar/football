<?php
namespace App\Form;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;  
use App\Entity\Game;
use App\Entity\Competition;
use App\Entity\Club;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;

class GameType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
        ->add('date', DateType::class, array('widget' => 'choice'))
        ->add('competition', EntityType::class, [
          'class' => Competition::class,
          'choice_label' => 'name',

        ])
        ->add('host', EntityType::class, [
          'class' => Club::class,
          'choice_label' => 'name',

        ])
        ->add('guest', EntityType::class, [
          'class' => Club::class,
          'choice_label' => 'name',

        ])
          ->add('save', SubmitType::class, array(
            'label' => 'Save',
            'attr' => array('class' => 'btn btn-primary mt-3')
          ));
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Game::class,
        ]);
    }
}
