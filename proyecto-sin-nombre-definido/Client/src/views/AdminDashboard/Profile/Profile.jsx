import React from "react";

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

// core components


function User() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <FormGroup>
                        <label>Company (disabled)</label>
                        <Input
                          defaultValue="Creative Code Inc."
                          disabled
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Username</label>
                        <Input
                          defaultValue="michael23"
                          placeholder="Username"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input placeholder="Email" type="email" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>First Name</label>
                        <Input
                          defaultValue="Mike"
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                          defaultValue="Andrew"
                          placeholder="Last Name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                          placeholder="Home Address"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>City</label>
                        <Input
                          defaultValue="Mike"
                          placeholder="City"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>Country</label>
                        <Input
                          defaultValue="Andrew"
                          placeholder="Country"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Postal Code</label>
                        <Input placeholder="ZIP Code" type="number" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          cols="80"
                          defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
                            that two seat Lambo."
                          placeholder="Here can be your description"
                          rows="4"
                          type="textarea"
                        />
                        <button className="btn btn-info">
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
                <img alt="..." src='data:image/jpeg;base64,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' />
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
                <Chart/>
              </CardBody>
              <hr />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  className="btn-neutral btn-icon btn-round"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  size="lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
                </Button>
                <Button
                  className="btn-neutral btn-icon btn-round"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  size="lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                    </svg>
                </Button>
                <Button
                  className="btn-neutral btn-icon btn-round"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  size="lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                    </svg>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default User;