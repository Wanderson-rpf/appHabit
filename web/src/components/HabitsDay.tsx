import * as Popover from "@radix-ui/react-popover";
import * as Checkbox from "@radix-ui/react-checkbox";
import clsx from "clsx";
import { ProgressBar } from "./ProgressBar";
import { Check } from "phosphor-react";
import dayjs from "dayjs";

interface HabitDayProps {
  date: Date;
  completed?: number;
  amount?: number;
}

export function HabitDay({ completed = 0, amount = 0, date }: HabitDayProps) {
  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const dayAndMonth = dayjs(date).format("DD/MM");
  const dayOfWeek = dayjs(date).format('dddd');

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

          <div className="container-checkbox">
            <Checkbox.Root className="group box-checkbox">
              <div className="box-indicator">
                <Checkbox.Indicator>
                  <Check size={20} />
                </Checkbox.Indicator>
              </div>
              <span className="span-habit">Beber 2L de água</span>
            </Checkbox.Root>
          </div>

          <Popover.Arrow height={8} width={16} className="popover-arrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
