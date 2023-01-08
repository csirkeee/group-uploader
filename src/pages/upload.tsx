import type { NextPage } from 'next';
import Head from 'next/head';

import Link from "next/link";
import { Button, Container, Form } from "react-bootstrap";

const UploadPage: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Group uploader</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <div>
        <Link href="/">Home</Link>
      </div>
      <Form action="/api/group" method="POST" encType="multipart/form-data">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="name" placeholder="Group name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Example textarea</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" />
        </Form.Group>
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Multiple files input example</Form.Label>
          <Form.Control type="file" multiple name="images"/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default UploadPage;
