import React, { useEffect, useState } from "react";
import axios from "axios";

// reactstrap components
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
import { putUser } from "../../../redux/actions";
import { useDispatch } from "react-redux";

// core components

function User() {
  const [data, setData] = useState({});
  const [editableData, setEditableData] = useState({});
  const [errors, setErrors] = useState({
    image: "",
  });
  const [imagen, setImagen] = useState({
    image: "",
  });
  const dispatch = useDispatch();
  
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFile = async (file) => {
    if (!file.type.includes("image")) {
      setErrors({ ...errors, image: "Solo puedes subir imágenes" });
      return;
    } else {
      setErrors({ ...errors, image: "" });
      const imageURL = URL.createObjectURL(new Blob([file]));
      setImagen({ ...imagen, image: imageURL });

      const fileData = new FormData();
      fileData.append("file", file);
      fileData.append("upload_preset", "Imagenes");
      fileData.append("cloud_name", "dkdounmsa");
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/dkdounmsa/image/upload`,
        fileData
      );

      setImagen({ ...imagen, image: data.secure_url });
    }
  };

  const cardStyle = {
    backgroundImage: `url(${imagen.image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
  };

  useEffect(() => {
    const info = localStorage.getItem("data");
    setData(JSON.parse(info));
    setEditableData(JSON.parse(info));
  }, [localStorage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData({
      ...editableData,
      [name]: value,
    });
  };

  const handleUpdate = (id) => {
    console.log('Si llega aca el ', id, 'y la data es',editableData);
    dispatch(putUser(id, editableData)).then((response) => {
      // Si la solicitud se realiza con éxito, puedes actualizar los datos en el estado local
      // Puedes agregar manejo de errores según sea necesario
      if (response.status === 200) {
        localStorage.setItem("data", JSON.stringify(editableData));
        setData({ ...editableData });
      }
    });
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Editar Perfil</h5>
              </CardHeader>
              <CardBody style={cardStyle}>
                <Form>
                  <Row>
                    <Col md="12" className="d-flex justify-content-center align-items-center">
                      <FormGroup>
                        <img
                          src={data.profilePic}
                          alt=""
                          style={{
                            height: "150px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "10px  #ccc",
                            background: "rgba(169, 181, 197, 0.562)",
                            margin: `15px 15px`,
                            textAlign: "center",
                            width: "200px",
                            top: "40px",
                            height: "200px",
                            borderRadius: "100px",
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
                          value={editableData.userName || ""}
                          onChange={handleInputChange}
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
                          value={editableData.fullName || ""}
                          onChange={handleInputChange}
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
                          value={editableData.address || ""}
                          onChange={handleInputChange}
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
                          value={editableData.nationality || ""}
                          onChange={handleInputChange}
                          disabled
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
                          value={editableData.birthDate || ""}
                          onChange={handleInputChange}
                          disabled
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
                          type="number"
                          value={editableData.phoneNumber || ""}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Genero</label>
                        <Input
                          name="phoneNumber"
                          placeholder="Número Teléfono"
                          type="text"
                          value={editableData.gender}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Sobre mí...</label>
                        <Input
                          name="aboutMe"
                          placeholder="Sobre mí..."
                          type="textarea"
                          value={editableData.aboutMe || ""}
                          onChange={handleInputChange}
                        />
                        <button className="btn btn-info" onClick={() => {handleUpdate(editableData.id)}}>
                          Actualizar
                        </button>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="image">
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleFile(e.target.files[0])}
                />
                <div
                  className={`d-flex text-center justify-content-center align-items-center `}
                  style={{
                    border: "10px  #ccc",
                    background: "rgba(169, 181, 197, 0.562)",
                    margin: `15px 15px`,
                    textAlign: "center",
                    width: "300px",
                    top: "20px",
                    position: "relative",
                    height: "200px",
                  }}
                  onDragEnter={(e) => e.preventDefault()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  {imagen.image ? (
                    <img
                      style={{
                        width: "300px",
                        height: "200px",
                        maxHeight: "200px",
                        objectFit: "cover",
                      }}
                      src={imagen.image}
                      alt={`Image ${imagen.image}`}
                    />
                  ) : (
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        fill="currentColor"
                        class="bi bi-card-image"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                        />
                        <path
                          d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"
                        />
                      </svg>
                      <br></br>
                      Arrastra o haz clic{" "}
                      <span
                        // Aquí puedes agregar un manejador de eventos para abrir el selector de archivos cuando se hace clic en "aquí".
                      >
                        {" "}
                        aquí
                      </span>
                      !
                    </div>
                  )}
                </div>
              </div>
              <CardBody>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                </div>
                <p className="description text-center">
                  "Lamborghini Mercy <br />
                  I'm in that two seat Lambo"
                </p>
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
