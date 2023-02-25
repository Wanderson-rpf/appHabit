import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";

interface HabitListProps {
  date: Date;
  onCompletedChenged: (completed: number) => void;
}

interface HabitsInfo {
  possibleHabits: Array<{
    id: string;
    title: string;
    create_at: string;
  }>

  completedHabits: string[]
}

export function HabitsList({ date, onCompletedChenged }: HabitListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()
  const [isLoading, setIsLoading] = useState(true)

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

  useEffect(() => {
    api.get('/day', {
      params: {
        date: date.toISOString(),
      }
    }).then(response => {
      setHabitsInfo(response.data);   
    })
  }, [])

  console.log(habitsInfo);

  // function checkHabitsInfo(id:string) {
  //   if (typeof habitsInfo !== undefined) {
  //     console.log('Não é undefined');
  //     return habitsInfo?.completedHabits.includes(id);
  //   }
  //   console.log('é undefined');
  //   return false;
  // }

  async function handleToggleHabit(habitId:string) {
    await api.patch(`/habits/${habitId}/toggle`);

    const isHabitCompleted = habitsInfo!.completedHabits.includes(habitId);

    let completedHabits: string[] = [];

    if (isHabitCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId);
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];
    }
    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits,
    })

    onCompletedChenged(completedHabits.length);
  }

  return (
    <div className="container-checkbox">
      {habitsInfo?.possibleHabits.map(habit => {
        return (
          <Checkbox.Root 
            key={habit.id}
            onCheckedChange={() => handleToggleHabit(habit.id)}
            // checked={checkHabitsInfo(habit.id)}
            // checked={habitsInfo.completedHabits.includes(habit.id)}
            disabled={isDateInPast}
            className="group box-checkbox"
          >
            <div className="box-indicator">
              <Checkbox.Indicator>
                <Check size={20} />
              </Checkbox.Indicator>
            </div>
            <span className="span-habit">{habit.title}</span>
          </Checkbox.Root>
        )
      })}
    </div>
  );
}
