<?php
namespace App\Form;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;  
use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
        ->add('username', TextType::class, array('attr' => array('class' => 'form-control')))
        ->add('password', TextType::class, array('attr' => array('class' => 'form-control')
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
            'data_class' => User::class,
            'attr' => ['id' => 'task-form'],
        ]);
    }
}
