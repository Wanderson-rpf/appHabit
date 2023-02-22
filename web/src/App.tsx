import { Header } from "./components/Header";
import { SummaryTable } from "./components/SummaryTable";
import "./lib/dayjs";
import "./style/global.css";

// import { Habit } from './components/habits'

export function App() {
  return (
    <div className="app-container">
      <div className="app-box">
        <Header />
        <SummaryTable />
      </div>
    </div>
  );
}
