import QRCodeStyling from "qr-code-styling";
import React, { useEffect, useRef, useState } from "react";
import { FormGroup, Navbar } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import fmeLogos from "./assets/images";
import "./styles.css";

// Initalize the qr instance
const qrCode = new QRCodeStyling({
  width: 2000,
  height: 2000,
  image:
    "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
  dotsOptions: {
    color: "black",
    type: "square",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 10,
  },
});

export default function App() {
  const [url, setUrl] = useState("https://fme.edu.vn");
  const [fileExt, setFileExt] = useState("png");
  const [logoUrl, setLogoUrl] = useState(fmeLogos.fmeEdu);
  const [brand, setBrand] = useState("none");
  const ref = useRef(null);

  // useEffect hoook to initailize the qr code and display it
  useEffect(() => {
    qrCode.append(ref.current);
  }, []);

  // useEffect hoook to initailize the qr code url
  useEffect(() => {
    qrCode.update({
      data: url,
    });
  }, [url]);

  // useEffect hook to initialize the logo image in the QR code based on the selected brand
  useEffect(() => {
    qrCode.update({
      image: logoUrl,
    });
  }, [logoUrl]);

  // useEffect hook to handle the logo URL and border initialization based on selected brand
  useEffect(() => {
    if (brand !== "none") {
      // Set the logo URL to the first logo of the selected brand
      setLogoUrl(fmeLogos[brand][0]);

      //Add the primary border color the the first logo box
      document.querySelector(`#boxLogo1`).classList.add("border-primary");

      //If no brand selected, clear the logo URL state
    } else setLogoUrl("");
  }, [brand]);

  // Function to prevent form submit default
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  // Function to handle updating the url state
  const onUrlChange = (event) => {
    setUrl(event.target.value);
  };
  // Function to handle updating the file extension state
  const onExtensionChange = (event) => {
    setFileExt(event.target.value);
  };

  // Function to handle updating the brand state
  const onBrandChange = (event) => {
    setBrand(event.target.value);
  };

  // Function to handle downloading the qr code with the selected file extension
  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt,
    });
  };

  // Function to handle updating the logo url when a user selects from list
  const handleSelectBrandLogo = (Url, index) => {
    // 1. Update the logo url in the state with the selected logo url, and update the qr code with the new logo's url in the state
    setLogoUrl(Url);

    // 2. Set border color of selected logo to the primary color
    fmeLogos[brand].map((ele, idx) => {
      if (idx === index) {
        document
          .querySelector(`#boxLogo${idx + 1}`)
          .classList.add("border-primary");
      } else {
        document
          .querySelector(`#boxLogo${idx + 1}`)
          .classList.remove("border-primary");
      }
    });
  };

  return (
    <div className="App">
      <Container className=" shadow-sm p-3 rounded-2">
        <h2>QR CODE GENERATOR</h2>

        {/* Imput URL and select brand */}
        <Row
          style={styles.inputWrapper}
          className="align-items-end mb-3 gap-2 justify-content-center"
        >
          <Col xs={12} md={6}>
            <Form.Group
              controlId="exampleForm.ControlInput1"
              className="d-flex align-items-center justify-items-center"
            >
              <Form.Label className="mb-0 mx-2">URL</Form.Label>
              <Form.Control type="text" value={url} onChange={onUrlChange} />
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group
              controlId="exampleForm.ControlInput1"
              className="d-flex align-items-center justify-items-center"
            >
              <Form.Label className="mb-0 mx-2">Brand</Form.Label>

              <Form.Select
                aria-label="Default select example"
                onChange={onBrandChange}
                value={brand}
              >
                <option value="none">None</option>
                <option value="fmeEdu">FME EDU</option>
                <option value="fmeTravel">FME TRAVEL</option>
                <option value="tec">TEC</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Brand logo list */}
        <Row className="d-flex justify-content-center align-items-center mb-4 mt-4 gap-2 brandLogo--list">
          {brand !== "none" &&
            fmeLogos[brand].map((Url, index) => (
              <Col xs={5} sm={4} md={3} key={index}>
                <FormGroup
                  id={`boxLogo${index + 1}`}
                  onClick={() => handleSelectBrandLogo(Url, index)}
                  className="d-flex flex-column justify-content-center align-items-center border rounded-2 pe-auto cursor-pointer brandLogo--item"
                >
                  <Form.Label
                    className="p-2 cursor-pointer"
                    htmlFor={`logo${index + 1}`}
                  >
                    <Image src={`${Url}`} width="50%" rounded />
                  </Form.Label>

                  <Form.Check
                    inline
                    label={`Logo ${index + 1}`}
                    name="logoUrl"
                    type="radio"
                    value={Url}
                    id={`logo${index + 1}`}
                    defaultChecked={index === 0}
                  />
                </FormGroup>
              </Col>
            ))}
        </Row>

        {/* QR Code generate Result */}
        <Row className="d-flex justify-content-center mb-4 mt-4">
          <Col className="qr-code">
            <div ref={ref}></div>
          </Col>
        </Row>

        {/* Container store download option and download button */}
        <Navbar bg="light" fixed="bottom">
          <Container>
            <Form onSubmit={handleFormSubmit} className="w-100 p-3">
              <Row className="d-flex justify-content-center gap-2">
                <Col xs={12} md={4}>
                  <Form.Group
                    controlId="exampleForm.ControlInput1"
                    className="d-flex align-items-center justify-items-center"
                  >
                    <Form.Label className="mb-0 mx-2">Logo</Form.Label>

                    <Form.Select
                      aria-label="Default select example"
                      onChange={onExtensionChange}
                      value={fileExt}
                    >
                      <option value="png">PNG</option>
                      <option value="jpeg">JPEG</option>
                      <option value="webp">WEBP</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={onDownloadClick}
                    className="w-100"
                  >
                    Download
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </Navbar>
      </Container>
    </div>
  );
}

const styles = {
  inputWrapper: {
    margin: "20px 0",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  inputBox: {
    flexGrow: 1,
    marginRight: 20,
  },
};
