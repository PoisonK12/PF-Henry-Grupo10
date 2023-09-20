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
    },
    {
      question: '¿Cuál es el proceso de check-in y check-out?',
      answer:
        'El proceso de check-in y check-out varía según la propiedad. Normalmente, recibirás instrucciones detalladas sobre cómo hacerlo antes de tu llegada. El check-in suele ser a partir de las 09:00 horas y el check-out antes de las 13:00 horas.'
    },
    {
      question: '¿Se admiten mascotas en las propiedades?',
      answer:
        'Algunas propiedades admiten mascotas, mientras que otras no. Debes consultar la política de mascotas de la propiedad específica que te interesa en la página de detalles antes de hacer la reserva.'
    },
    {
      question: '¿Puedo modificar las fechas de mi reserva?',
      answer:
        'Sí, puedes modificar las fechas de tu reserva si la propiedad lo permite y si lo haces dentro de los plazos establecidos en la política de modificación. Para hacerlo, ve a tu cuenta y busca la reserva que deseas modificar.'
    },
    {
      question: '¿Qué servicios están incluidos en el precio de la reserva?',
      answer:
        'Los servicios incluidos varían según la propiedad. Por lo general, el precio de la reserva incluye el alojamiento y ciertos servicios básicos. Consulta la descripción de la propiedad para obtener información detallada sobre los servicios incluidos.'
    },
    {
      question: '¿Cuál es la política de reembolso en caso de cancelación?',
      answer:
        'La política de reembolso varía según la propiedad y las condiciones de cancelación que elijas al hacer la reserva. Es importante revisar las condiciones de cancelación antes de confirmar tu reserva, ya que algunas propiedades ofrecen reembolsos completos, mientras que otras pueden tener restricciones.'
    },
    {
      question: '¿Cómo puedo hacer una solicitud de reserva especial?',
      answer:
        'Si deseas hacer una solicitud de reserva especial, puedes contactarnos a través de nuestro formulario de contacto o comunicarte directamente con nuestro servicio de atención al cliente. Estaremos encantados de ayudarte a realizar una reserva que se ajuste a tus necesidades específicas.'
    }
    
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const [active2Index, setActive2Index] = useState(null);

  const handleQuestionClick = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const handleQuestionClick2 = (index2) => {
    if (index2 === active2Index) {
      setActive2Index(null);
    } else {
      setActive2Index(index2);
    }
  };

  return (
    <div className={styles['wrap']}>
    <div className={styles['faq-container']}>
      <h1>Preguntas Frecuentes</h1>
      <div className='row'>
        <div className='col-6'>
          <ul className={styles['faq-list']}>
          {faqData.slice(0, 5).map((faq, index) => (
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
        <div className='col-6'>
        <ul className={styles['faq-list']}>
          {faqData.slice(5, 10).map((faq, index2) => (
            <li
              key={index2}
              className={`${styles['faq-item']} ${active2Index === index2 ? styles.active : ''}`}
              onClick={() => handleQuestionClick2(index2)}
            >
              <div className={styles['faq-question']}>{faq.question}</div>
              {active2Index === index2 && <div className={styles['faq-answer']}>{faq.answer}</div>}
            </li>
          ))}
          </ul>
        </div>

      </div>
      
    </div>
    </div>
  );
};

export default FAQ;
