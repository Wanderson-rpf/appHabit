interface ProgressBarProps {
  progress: number
}

export function ProgressBar(props: ProgressBarProps) {
  const progressStyles = {
    width: `${props.progress}%`
  }

  return (
    <div className='container-progress'>
      <div 
        // configurações para acessibilidade
        role='progressbar'
        aria-label='Progresso de hábitos completados nesse dia'
        aria-valuenow={props.progress}

        className="progress"
        style={ progressStyles }
      />
    </div>
  );
}