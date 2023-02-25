import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { generateDateFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { HabitDay } from "./HabitsDay";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const summaryDates = generateDateFromYearBeginning();
const minimumSummaryDatesSize = 18 * 7; // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

type Summary = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>;

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([]);

  useEffect(() => {
    api.get("/summary").then((response) => {
      setSummary(response.data);
    });
  }, []);

  return (
    <div className="container-summary-table">
      <div className="container-days-week">
        {weekDays.map((day, index) => (
          <div key={`${day}-${index}`} className="box-days-week">
            {day}
          </div>
        ))}
      </div>
      <div className="container-days-habits">
        {summary.length > 0 && summaryDates.map((date) => {
          const dayInSummary = summary.find((day) => {
            return dayjs(date).isSame(day.date, "day");
          });

          return (
            <HabitDay
              key={date.toString()}
              date={date}
              amount={dayInSummary?.amount}
              defaultCompleted={dayInSummary?.completed}
            />
          );
        })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, index) => {
            return <div key={index} className="box-day-placeholder"></div>;
          })}
      </div>
    </div>
  );
}
