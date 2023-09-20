import React, { useState, useEffect } from 'react';

function EasterEgg() {
  const [sequence, setSequence] = useState([]);
  const easterEggSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

  const checkEasterEgg = () => {
    const currentSequence = sequence.join(',');
    const correctSequence = easterEggSequence.slice(0, sequence.length).join(',');
    console.log(correctSequence)
    if (currentSequence === correctSequence) {
      if (sequence.length === easterEggSequence.length) {
        // Easter Egg activado
        window.alert("Easter Egg activado")
        console.log("Activadisimo")
        resetSequence();

        // Aquí puedes agregar la funcionalidad que desees al elemento
        const miElemento = document.getElementById('miElemento');
        if (miElemento) {
          // Por ejemplo, cambia el contenido del elemento
          miElemento.textContent = 'Easter Egg activado';
        }
      }
    } else {
      // Secuencia incorrecta, reiniciar
      resetSequence();
    }
  };

  const resetSequence = () => {
    setSequence([]);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const nextKey = easterEggSequence[sequence.length];
      console.log('Tecla presionada:', event.key);
  console.log('Secuencia actual:', sequence);

      if (event.key === nextKey) {
        setSequence((prevSequence) => [...prevSequence, event.key]);
        checkEasterEgg();
      } else {
        // Tecla incorrecta, reiniciar
        resetSequence();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [sequence]);
    console.log(sequence)

  return (
    <div>
      {/* El elemento al que deseas asignar el Easter Egg */}
      <div id="miElemento" style={{position:"absolute", top:"50%", right:"50%"}}>Este es el elemento al que deseas asignar el Easter Egg.</div>
    </div>
  );
}

export default EasterEgg;
