import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import Chart from "./chart";
import { useDispatch } from "react-redux";
import { putUser } from "../../../redux/actions";
import style from './profile.module.css'

function User() {
  const [data, setData] = useState({});
  const [form, setForm] = useState({
    userName: data.userName,
    fullName: "",
    profilePic: "",
    address: "",
    nationality: "",
    birthDate: "",
    phoneNumber: "",
    gender: ""
  });
  console.log('formulario',form);
  const [errors, setErrors] = useState({
    image: "",
  });
  const [imagen, setImagen] = useState({
    image: "",
  });
  const dispatch = useDispatch();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleUpdate =  (e) => {
    e.preventDefault(e)
    console.log('Datos que se van a enviar:', form);
    dispatch(putUser(form))
    
  };
  
  

  const cardStyle = {
    backgroundImage: `url(${imagen.image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
  };

  useEffect(() => {
    // Obtén los datos del usuario y establece tanto "data" como "form"
    const info = localStorage.getItem("data");
    const userData = JSON.parse(info);
    // setData(userData);
    setForm({userName: userData.userName,
      fullName: userData.fullName,
      profilePic: userData.profilePic,
      address: userData.address,
      nationality: userData.nationality,
      birthDate: userData.birthDate,
      phoneNumber: userData.phoneNumber,
      gender: userData.gender,
      password:userData.password
    });
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Editar Perfil {form.phoneNumber}</h5>
              </CardHeader>
              <CardBody style={cardStyle}>
                <Form onSubmit={handleUpdate}>
                
                  <Row className={style.containerImagen}>
                    <Col md="12" className="d-flex justify-content-center align-items-center ">
                      <h1 className={style.firma}>{form.userName}</h1>
                      <FormGroup>
                        <img
                          src={form.profilePic}
                          alt=""
                          style={{
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "10px  #ccc",
                            background: "rgba(169, 181, 197, 0.562)",
                            margin: `15px 15px`,
                            textAlign: "center",
                            width: "200px",
                            top: "40px",
                            height: "200px",
                          }}
                        />
                      </FormGroup>
                    
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Nombre Usuario</label>
                        <Input
                          name="userName"
                          placeholder="Nombre Usuario"
                          type="text"
                          value={form.userName}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Nombre Completo</label>
                        <Input
                          name="fullName"
                          placeholder="Nombre Completo"
                          type="text"
                          value={form.fullName}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Dirección</label>
                        <Input
                          name="address"
                          placeholder="Dirección"
                          type="text"
                          value={form.address || ""}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Nacionalidad</label>
                        <Input
                          name="nationality"
                          placeholder="Nacionalidad"
                          type="text"
                          value={form.nationality}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="6">
                      <FormGroup>
                        <label>Fecha Cumpleaños</label>
                        <Input
                          name="birthDate"
                          placeholder="Fecha Cumpleaños"
                          type="text"
                          value={form.birthDate}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Número Teléfono</label>
                        <Input
                          name="phoneNumber"
                          placeholder="Número Teléfono"
                          type="text"
                          value={form.phoneNumber}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Género</label>
                        <Input
                          type="text"
                          name="gender"
                          id="genderSelect"
                          value={form.gender}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12 d-flex justify-content-center align-items-center">
                      <FormGroup>
                        <button type="submit" className="btn btn-warning">Editar</button>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              
              <div className={style.wave}>
                <h1 className={style.titulo}>Bienvenido</h1>
                <h3 className={style.name} style={{display: "flex", justifyContent: "center"}}>{form.fullName}</h3>
                <h4 className={style.estrella} >
                <span className={style.start}>&#9733;</span>
                <span className={style.start}>&#9733;</span>
                <span className={style.start}>&#9733;</span>
                <span className={style.start}>&#9733;</span>
                <span className={style.start}>&#9733;</span>
              </h4>
              </div>
              <CardBody>
                <div className={style.reloj}>
                  <div className={style.face}>
                      <p className={style.vIndex}>II
                      </p>
                      <p className={style.hIndex}>II
                      </p>
                      <div className={style.hand}>
                          <div className={style.hand}>
                              <div className={style.hour}></div>
                              <div className={style.minute}></div>
                              <div className={style.second}></div>
                          </div>
                      </div>
                  </div>
                </div>
                <Chart />
              </CardBody>
              <hr />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default User;


      