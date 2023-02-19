import logoImage from '../assets/logo.svg';
import { Plus, X } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import { NewHabitForm } from './NewHabitForm';
// import { useState } from 'react';

export function Header() {

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleClick = () => {
  //   setIsModalOpen(true);
  // };
  
  return (
  <div className='container-header'>
    <img src={ logoImage } alt="logo" />

    <Dialog.Root>
      <Dialog.Trigger
        type='button'
        className='btn-new-habit'
      >
      <Plus size={20} className="icon-add-habit" />
        Novo Hábito
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='modal-overlay' />
        <Dialog.Content className='modal-content'>
          <Dialog.Close className='modal-close'>
            <X size={24} aria-label="Fechar" />
          </Dialog.Close>
          <Dialog.Title className='modal-title'>
            Criar hábito
          </Dialog.Title>

          <NewHabitForm />
        </Dialog.Content>

      </Dialog.Portal>
    </Dialog.Root>

  </div>
  );
}