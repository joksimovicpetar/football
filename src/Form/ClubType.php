<?php
namespace App\Form;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;  
use App\Entity\Club;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ClubType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', TextType::class, array('attr' => array('class' => 'form-control', 'id' => 'club_name')))
            ->add('save', SubmitType::class, array(
                      'label' => 'Create',
                      'attr' => array('class' => 'btn btn-primary mt-3')
                    ));
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Club::class,
            'attr' => ['id' => 'task-form'],
            'validation_groups' => ['registration']
        ]);
    }
}
