import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';

const steps = [
    {
        id: '0',
        message: '¡Hola! Soy el asistente de viajes de Great Travel. ¿En qué puedo ayudarte hoy?',
        trigger: '1',
      },
      {
        id: '1',
        message: 'Por favor, indícame tu nombre para empezar.',
        trigger: '2',
      },
      {
        id: '2',
        user: true,
        trigger: '3',
      },
      {
        id: '3',
        message: 'Hola {previousValue}, ¿A dónde te gustaría viajar?',
        trigger: 'destination',
      },
      {
        id: 'destination',
        user: true,
        trigger: '4',
      },
      {
        id: '4',
        message: 'Excelente elección. ¿Para cuántas personas será el viaje?',
        trigger: 'guests',
      },
      {
        id: 'guests',
        user: true,
        trigger: '5',
        validator: (value) => {
          if (isNaN(value) || parseInt(value) < 1) {
            return 'Por favor, introduce un número válido.';
          }
          return true;
        },
      },
      {
        id: '5',
        message: '¿Qué fecha de entrada tienes en mente? (Formato: DD/MM/AAAA)',
        trigger: 'check-in',
      },
      {
        id: 'check-in',
        user: true,
        trigger: '6',
      },
      {
        id: '6',
        message: '¿Y la fecha de salida? (Formato: DD/MM/AAAA)',
        trigger: 'check-out',
      },
      {
        id: 'check-out',
        user: true,
        trigger: '7',
      },
      {
        id: '7',
        message: 'Perfecto. Estoy buscando las mejores opciones para ti...',
        end: true,
      },
];

const theme = {
    background: '#C9FF8F',
    headerBgColor: '#04CAD1',
    headerFontSize: '20px',
    botBubbleColor: '#04CAD1',
    headerFontColor: 'white',
    botFontColor: 'white',
    userBubbleColor: '#FF5733',
    userFontColor: 'white',
};

const config = {
    botAvatar: "img.png",
    floating: true,
};

function Chatbot() {
    const userInputProps = {
        placeholder: 'Escribe tu respuesta aquí...', // Cambia este texto
      };
  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        headerTitle="Travel Bot"
        steps={steps}
        {...config}
        userInputProps={userInputProps} 
      />
    </ThemeProvider>
  );
}

export default Chatbot;