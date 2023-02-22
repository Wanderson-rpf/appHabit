import { Check } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const avaliableWeekDays = [
  "Domingo",
  "Segunda-feria",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sabado",
];

export function NewHabitForm() {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  async function createNewHabit(event: FormEvent) {
    event.preventDefault();

    if (!title || weekDays.length === 0) {
      return;
    }

    await api.post("/habits", {
      title,
      weekDays,
    });

    setTitle("");
    setWeekDays([]);
    alert("Hábito criado com sucesso!");
  }

  function handleToggleWeekDay(day: number) {
    if (weekDays.includes(day)) {
      const newWeekDays = weekDays.filter((d) => d !== day);
      setWeekDays(newWeekDays);
    } else {
      const addWeekDay = [...weekDays, day];
      setWeekDays(addWeekDay);
    }
  }

  return (
    <form onSubmit={createNewHabit} className="form-new-habit">
      <label htmlFor="title" className="label-title">
        Qual seu comprometimento?
      </label>
      <input
        type="text"
        id="title"
        placeholder="ex.: Exercícios, dormir be, etc"
        className="input-title"
        autoFocus
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <label htmlFor="" className="label-title">
        Qual a recorrência?
      </label>

      <div className="container-checkbox-new-habit">
        {avaliableWeekDays.map((weekDay, index) => {
          return (
            <Checkbox.Root
              key={weekDay}
              className="group box-checkbox"
              checked={weekDays.includes(index)}
              onCheckedChange={() => handleToggleWeekDay(index)}
            >
              <div className="box-indicator">
                <Checkbox.Indicator>
                  <Check size={20} />
                </Checkbox.Indicator>
              </div>
              <span className="span-new-habit">{weekDay}</span>
            </Checkbox.Root>
          );
        })}
      </div>

      <button type="submit" className="button-form">
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
