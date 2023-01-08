import type { NextPage } from 'next';
import { Button, Container, Form, Navbar } from "react-bootstrap";
import NextImage from "next/image";

const UploadPage: NextPage = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <NextImage
              alt="Home"
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Group uploader
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <h1>Upload new group</h1>
        <Form action="/api/group" method="POST" encType="multipart/form-data">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name of the group</Form.Label>
            <Form.Control name="name" placeholder="Group name"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description of the group</Form.Label>
            <Form.Control as="textarea" rows={3} name="description"/>
          </Form.Group>
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>The images</Form.Label>
            <Form.Control type="file" multiple name="images"/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default UploadPage;
