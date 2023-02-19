import { Check } from "phosphor-react";

export function NewHabitForm() {
  return (
    <form className="form-new-habit">
      <label htmlFor="title" className="label-title">
        Qual seu comprometimento?
      </label>
      <input 
        type="text"
        id="title"
        placeholder="ex.: Exercícios, dormir be, etc"
        className="input-title"
        autoFocus
      />
      <label htmlFor="" className="label-title">
        Qual a recorrência?
      </label>
      <button type="submit" className="button-form">
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}