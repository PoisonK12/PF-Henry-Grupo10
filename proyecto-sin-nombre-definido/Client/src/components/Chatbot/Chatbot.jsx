import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import { searchByFilter } from '../../redux/actions';
import { useDispatch } from 'react-redux';


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
  const [userName, setUserName] = useState({
    location:'',
    rooms: 0,
    bathrooms: 0,
    onSale: false,
    rentPriceMax: 0,
    rentPriceMin: 0,
    sellPriceMax: 0,
    sellPriceMin: 0,
  });
  console.log(userName);
  const dispatch = useDispatch();

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
      validator: (location) => {
        if (!location || location.trim() === '') {
          return 'Por favor, ingresa un nombre válido.';
        }
        setUserName({...userName,location:location});
        console.log(userName);
        return true;
      },
    },
    {
      id: '4',
      message: ' ¿Valor maximo?',
      trigger: '5',

    },
    {
      id: '5',
      user: true,
      trigger: '6',
      validator: (rentPriceMax) => {
        if (!rentPriceMax || rentPriceMax.trim() === '') {
          return 'Por favor, ingresa un precio válido.';
        }
        setUserName((e)=>({...e,rentPriceMax:rentPriceMax}));
        console.log(userName);
        return true;
      },
    },
    {
      id: '6',
      message: 'Valor {previousValue}, ¿Valor minimo?',
      trigger: '7',
    },
    {
      id: '7',
      user: true,
      trigger: '8',
      validator: (rentPriceMin) => {
        if (!rentPriceMin || rentPriceMin.trim() === '') {
          return 'Por favor, ingresa un precio válido.';
        }
        setUserName((e)=>({...e,rentPriceMin:rentPriceMin}));
        console.log(userName);
        return true;
      },
    },
    {
      id: '8',
      message: 'Perfecto. Estoy buscando las mejores opciones para ti...',
      end: true,
    },
  ];

  const handleCitySelection = () => {
    // Realiza redirección a la página de propiedades con el parámetro 'location'
    navigate(`/property?location=${userName.location}&rentPriceMax=${userName.rentPriceMax}&rentPriceMin=${userName.rentPriceMin}`);
    dispatch(searchByFilter(userName))
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
