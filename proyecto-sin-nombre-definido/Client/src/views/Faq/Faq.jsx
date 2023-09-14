import React, { useState } from 'react';
import styles from './FAQ.module.css'; // Importa tus estilos CSS Modules
import faq from '../../assets/images/faq.jpg'

const FAQ = () => {
  const faqData = [
    {
      question: '¿Cómo puedo reservar una propiedad?',
      answer:
        'Para reservar una propiedad, primero debes crear una cuenta y luego buscar la propiedad que desees en nuestra plataforma. Una vez que encuentres la propiedad perfecta, selecciona las fechas de tu estadía y sigue las instrucciones para completar la reserva.'
    },
    {
      question: '¿Cuáles son las opciones de pago disponibles?',
      answer:
        'Por el momemnto solo aceptamos pago por Stripe, transferencias bancarias y otros métodos de pago serán incluidos próximamente. Puedes seleccionar tu método de pago durante el proceso de reserva.'
    },
    {
      question: '¿Cómo puedo ponerme en contacto con el propietario de la propiedad?',
      answer:
        'Puedes comunicarte con el propietario de la propiedad a través de nuestra plataforma. Una vez que hayas reservado una propiedad, encontrarás la información de contacto del propietario en la página de reserva.'
    },
    {
      question: '¿Qué sucede si necesito cancelar mi reserva?',
      answer:
        'Si necesitas cancelar tu reserva, puedes hacerlo a través de nuestra plataforma. Las políticas de cancelación pueden variar según la propiedad, así que asegúrate de revisar la política de cancelación de la propiedad específica que has reservado.'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const handleQuestionClick = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className={styles['wrap']}>
    <div className={styles['faq-container']}>
      <h1>Preguntas Frecuentes</h1>
      <ul className={styles['faq-list']}>
        {faqData.map((faq, index) => (
          <li
            key={index}
            className={`${styles['faq-item']} ${activeIndex === index ? styles.active : ''}`}
            onClick={() => handleQuestionClick(index)}
          >
            <div className={styles['faq-question']}>{faq.question}</div>
            {activeIndex === index && <div className={styles['faq-answer']}>{faq.answer}</div>}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default FAQ;
