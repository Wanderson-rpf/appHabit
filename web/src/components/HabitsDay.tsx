import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { ProgressBar } from './ProgressBar';

interface HabitDayProps {
  completed: number
  amount: number
}

export function HabitDay({ completed, amount }: HabitDayProps) {
  const completedPercentage =  Math.round((completed / amount ) * 100);

  return (
    <Popover.Root>
      <Popover.Trigger 
        className={ clsx('box-day', {
          'box-day-0': completedPercentage === 0,
          'box-day-20': completedPercentage > 0 && completedPercentage < 20,
          'box-day-40': completedPercentage >= 20 && completedPercentage < 40,
          'box-day-60': completedPercentage >= 40 && completedPercentage < 60,
          'box-day-80': completedPercentage >= 60 && completedPercentage < 80,
          'box-day-80-plus': completedPercentage >= 80,
        })}
      />

      <Popover.Portal>
        <Popover.Content className='popover-content'>
          <span className='span-day'>Domingo</span>
          <span className='span-date'>19/02</span>

          <ProgressBar progress={completedPercentage} />

          <Popover.Arrow height={8} width={16} className='popover-arrow' />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}