import React from 'react'
import style from './contacts.module.css'

const Contacts = () => {
  return (
    <div className={style.cont}>
      <form className={`${style['row-cols-1']} ${style['custom-container']}`}>
        <h1 className={style.title}>Contacts</h1>
        <div  className="mb-3 w-90 ">
          <label htmlFor="name" className="form-label ">Name</label>
          <input type="text" className="form-control" id="name" placeholder="Name"/>
        </div>
        <div  className="mb-3 w-90">
          <label htmlFor="lastName" className="form-label">LastName</label>
          <input type="text" className="form-control" id="lastName" placeholder="Last Name"/>
        </div>
        <div  className="mb-3 w-90">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="tel" className="form-control" id="phone" placeholder="+81 548712487"/>
        </div>
        <div  className="mb-3 w-90">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" placeholder="name@example.com"/>
        </div>
        <div  className="mb-3 w-90">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea className="form-control" id="message" name="message" placeholder="Enter your message here" rows="3"></textarea>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Enviar</button>
        </div>
      </form>
    </div>
  )
}

export default Contacts
