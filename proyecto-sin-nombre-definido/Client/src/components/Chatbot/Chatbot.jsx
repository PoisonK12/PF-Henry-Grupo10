import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';

const theme = {
  background: '#C9FF8F',
  headerBgColor: '#9d0aca',
  headerFontSize: '20px',
  botBubbleColor: '#9d0aca',
  headerFontColor: 'white',
  botFontColor: 'white',
  userBubbleColor: '#091f44',
  userFontColor: 'white',
};

const config = {
  botAvatar: 'img.png',
  floating: true,
};

function Chatbot() {
  const { location } = useParams(); // Obtén el parámetro 'location' de la URL
  const navigate = useNavigate(); // Obtiene la función de navegación
  const [userName, setUserName] = useState('');

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
      message: 'Hola {previousValue}, ¿En qué ciudad te gustaría hospedarte?',
      trigger: 'destination',
    },
    {
      id: 'destination',
      user: true,
      trigger: '4',
      validator: (value) => {
        if (!value || value.trim() === '') {
          return 'Por favor, ingresa un nombre válido.';
        }
        setUserName(value);
        return true;
      },
    },
    {
      id: '4',
      message: 'Perfecto. Estoy buscando las mejores opciones para ti...',
      end: true,
    },
  ];

  const handleCitySelection = () => {
    // Realiza redirección a la página de propiedades con el parámetro 'location'
    navigate(`/property/${userName}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        headerTitle="Travel Bot"
        steps={steps}
        {...config}
        handleEnd={handleCitySelection} // Llama a la función de redirección al finalizar el chat
      />
    </ThemeProvider>
  );
};

export default Chatbot;
