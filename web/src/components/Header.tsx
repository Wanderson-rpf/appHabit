import logoImage from '../assets/logo.svg';
import { Plus } from 'phosphor-react';

export function Header() {
  return (
  <div className='container-header'>
    <img src={ logoImage } alt="logo" />

    <button
      type='button'
      className='btn-new-habit'
    >
      <Plus size={20} className="icon-add-habit" />
      Novo Hábito
    </button>
  </div>
  );
}