<?php
namespace App\Form;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;  
use App\Entity\Player;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use App\Entity\City;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\HttpFoundation\JsonResponse;

use Symfony\Component\Validator\Validator\ValidatorInterface;

use App\Repository\PlayerRepository;
use Doctrine\ORM\EntityManagerInterface;
class PlayerType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
        ->add('firstName', TextType::class, array('attr' => array('class' => 'form-control', 'required'=>false)))
          ->add('lastName', TextType::class, array('attr' => array('class' => 'form-control')))
          ->add('personalIdentifier', TextType::class, array('attr' => array('class' => 'form-control')))
          ->add('date_of_birth', DateType::class, array('widget' => 'choice'))
          ->add('city', EntityType::class, [
            'class' => City::class,
            'choice_label' => 'name',

        ])
        ->add('position', ChoiceType::class, [
          'choices'=> [
            'CB' => 'CB', 
            'CMF'=>'CMF', 
            'LB'=>'LB', 
            'CF'=>'CF'
          ]])
          ->add('profileImage', FileType::class, [
            'mapped' => false,
            'label' => 'Choose photo'])
          ->add('save', SubmitType::class, array(
            'label' => 'Save',
            'attr' => array('class' => 'btn btn-primary mt-3')
          ));
    }
    
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Player::class,
        ]);
    }
}
