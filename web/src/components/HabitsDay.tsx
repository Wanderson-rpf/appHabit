import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import { ProgressBar } from "./ProgressBar";
import dayjs from "dayjs";
import { HabitsList } from "./HabitsList";
import { useState } from "react";

interface HabitDayProps {
  date: Date;
  defaultCompleted?: number;
  amount?: number;
}

export function HabitDay({ defaultCompleted = 0, amount = 0, date }: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted);

  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const dayAndMonth = dayjs(date).format("DD/MM");
  const dayOfWeek = dayjs(date).format("dddd");


  function handleCompletedChanged(completed: number) {
    console.log(completed);
    setCompleted(completed);
    
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx("box-day", {
          "box-day-0": completedPercentage === 0,
          "box-day-20": completedPercentage > 0 && completedPercentage < 20,
          "box-day-40": completedPercentage >= 20 && completedPercentage < 40,
          "box-day-60": completedPercentage >= 40 && completedPercentage < 60,
          "box-day-80": completedPercentage >= 60 && completedPercentage < 80,
          "box-day-80-plus": completedPercentage >= 80,
        })}
      />

      <Popover.Portal>
        <Popover.Content className="popover-content">
          <span className="span-day">{dayOfWeek}</span>
          <span className="span-date">{dayAndMonth}</span>

          <ProgressBar progress={completedPercentage} />

          <HabitsList date={date} onCompletedChenged={handleCompletedChanged} />

          <Popover.Arrow height={8} width={16} className="popover-arrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
