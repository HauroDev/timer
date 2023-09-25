import { useState } from 'react';
import Timer from './components/Timer/Timer';
import styled from './App.module.css';

const assignUUID = () => {
  return crypto.randomUUID();
};

function App() {
  const [timers, setTimers] = useState<Array<{ title: string; id: string }>>(
    []
  );
  const [tag, setTag] = useState<string>('');

  const addTimer = (title: string) => {
    setTimers([...timers, { title, id: assignUUID() }]);
  };

  const removeTimer = (id: string) => {
    setTimers(timers.filter((t) => t.id !== id));
  };

  return (
    <>
      <header className={styled.header}>
        <h1 className={styled.title}>Timer</h1>
        <div className={styled.inputSection}>
          <input
            className={styled.input}
            value={tag}
            placeholder='Ingresa el nombre del Cronometro'
            autoComplete='off'
            type='text'
            onChange={(event) => setTag(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                addTimer(tag);
                setTag('');
              }
            }}
          />
          <p className={styled.label}>Oprima enter para agregar Cronometro</p>
        </div>
      </header>
      <main className={styled.content}>
        {timers.map((t) => (
          <Timer
            key={t.id}
            title={t.title}
            onClose={() => removeTimer(t.id)}
          />
        ))}
      </main>
    </>
  );
}

export default App;
