<?php
namespace App\Form;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;  
use App\Entity\City;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CityType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
        ->add('zip', TextType::class, array('attr' => array('class' => 'form-control')))
        ->add('name', TextType::class, array(
            'attr' => array('class' => 'form-control')
          ))
        ->setMethod('POST')
        ->add('save', SubmitType::class, array(
                      'label' => 'Save',
                      'attr' => array('class' => 'btn btn-primary mt-3')
                    ));
    }
    
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => City::class,
            'attr' => ['id' => 'task-form'],
        ]);
    }
}
