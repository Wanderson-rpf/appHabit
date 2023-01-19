interface HabitProps {
  completed: number
}

export function Habit(props: HabitProps) {
  return (
    <div>
      <div className="habits-checks">{props.completed}</div>
    </div>
  )
}