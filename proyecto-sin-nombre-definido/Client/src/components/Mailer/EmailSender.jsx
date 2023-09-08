import React, { useState } from 'react';
import nodemailer from 'nodemailer';

const EmailSender = () => {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailData({
      ...emailData,
      [name]: value,
    });
  };

  const sendEmail = async () => {
    try {
      const response = await fetch('/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        alert('Correo electrónico enviado con éxito.');
      } else {
        alert('Error al enviar el correo electrónico.');
      }
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
    }
  };

  return (
    <div>
      <h2>Enviar Correo Electrónico</h2>
      <form>
        <div>
          <label>Para:</label>
          <input type="email" name="to" value={emailData.to} onChange={handleInputChange} />
        </div>
        <div>
          <label>Asunto:</label>
          <input type="text" name="subject" value={emailData.subject} onChange={handleInputChange} />
        </div>
        <div>
          <label>Mensaje:</label>
          <textarea name="message" value={emailData.message} onChange={handleInputChange}></textarea>
        </div>
        <button type="button" onClick={sendEmail}>Enviar Correo</button>
      </form>
    </div>
  );
};

export default EmailSender;