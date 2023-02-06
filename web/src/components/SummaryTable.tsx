import { generateDateFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { HabitDay } from "./habitsDay";

export function SummaryTable() {
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const summaryDates = generateDateFromYearBeginning();
  const minimumSummaryDatesSize = 18 * 7; // 18 weeks
  const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

  return (
    <div className="container-summary-table">
      <div className="container-days-week">
        { weekDays.map((day, index) => (
          <div key={ `${day}-${index}` } className="box-days-week">{ day }</div>
        ))}
      </div>
      <div className="container-days-habits">
        { summaryDates.map(date => {
          return <HabitDay key={ date.toString() } />})
        }

        { amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, index) => {
          return (
            <div key={ index } className="box-day-placeholder"></div>)}
          ) 
        }
      </div>
    </div>
  );
}