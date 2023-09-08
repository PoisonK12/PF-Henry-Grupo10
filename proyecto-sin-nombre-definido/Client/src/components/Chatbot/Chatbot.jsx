import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import { searchByFilter } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

import avatar from "../../assets/images/avatar.jpg"

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
  botAvatar: avatar,
  floating: true,
};

function Chatbot() {
<<<<<<< HEAD
  const { location } = useParams();
  const navigate = useNavigate();
  const props = useSelector(state => state.properties);
  console.log(props);
=======
  const navigate = useNavigate(); // Obtiene la función de navegación
  const props = useSelector(state => state.properties)
>>>>>>> bccdda49ac964f47a238cd272ad05296acb487c8
  const [userName, setUserName] = useState({
    location: '',
    rooms: 0,
    bathrooms: 0,
    onSale: false,
    rentPriceMax: 0,
    rentPriceMin: 0,
    sellPriceMax: 0,
    sellPriceMin: 0,
  });
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
      message: 'Aquí tienes algunas opciones de propiedades en diferentes ciudades:',
      trigger: 'showOptions',
    },
    {
      id: 'showOptions',
      options: [
        ...props.map(property => ({
          value: property.location,
          label: property.location,
          trigger: '4', // El próximo paso cuando se seleccione una opción
        })),
      ],
     
    },
    {
      id: '4',
      message: '¿Valor máximo?',
      trigger: '5',
    },
    {
      id: '5',
      user: true,
      trigger: '6',
    },
    {
      id: '6',
      message: 'Valor {previousValue}, ¿Valor mínimo?',
      trigger: '7',
    },
    {
      id: '7',
      user: true,
      trigger: '8',
    },
    {
      id: '8',
      message: 'Perfecto. Estoy buscando las mejores opciones para ti...',
      end: true,
    },
  ];

  const handleCitySelection = () => {
    dispatch(searchByFilter(userName));
    if (!props.length) {
      return;
    } else {
      navigate(`/property?location=${userName.location}&rentPriceMax=${userName.rentPriceMax}&rentPriceMin=${userName.rentPriceMin}`);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        headerTitle="Travel Bot"
        steps={steps}
        {...config}
        handleEnd={handleCitySelection}
      />
    </ThemeProvider>
  );
}

export default Chatbot;
