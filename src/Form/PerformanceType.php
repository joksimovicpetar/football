<?php

namespace App\Form;

use App\Entity\Performance;
use App\Entity\Game;
use App\Entity\Player;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PerformanceType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
        ->add('game', EntityType::class, [
            'class' => Game::class,
            'multiple' => false,
            'choice_label' => 'id',
            'query_builder' => function (EntityRepository $er) {
                return $er->createQueryBuilder('t')
                    ->orderBy('t.id', 'ASC');
            },
            'label' => 'Game',
            'by_reference' => true,
            'attr' => [
                'class' => 'select-tags'
            ]
        ])
            ->add('playerPerformance', TextType::class)
            ->add('player', EntityType::class, [
                'class' => Player::class,
                'multiple' => false,
                'choice_label' => 'lastName',
                'query_builder' => function (EntityRepository $er) {
                    return $er->createQueryBuilder('t')
                        ->orderBy('t.lastName', 'ASC');
                },
                'label' => 'Player',
                'by_reference' => true,
                'attr' => [
                    'class' => 'select-tags',
                    'id' => 'player_id'
                ]
            ])
            
            // ->add('game')
            ->add('save', SubmitType::class, array(
                'label' => 'Create',
                'attr' => array('class' => 'btn btn-primary mt-3')
            ));;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Performance::class,
            'csrf_protection'=>false,
            'attr' => ['id' => 'task-form'],
            'validation_groups' => false

        ]);
    }
}
