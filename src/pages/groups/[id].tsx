import type { GetServerSideProps, NextPage } from 'next';

import { getOneGroup } from "../../services/groupService";
import { Group } from "../../dtos/group";
import { Col, Container, Navbar, Row, Image, Card } from "react-bootstrap";
import NextImage from "next/image"

type GroupPageProps = {
  group: Group;
}

const GroupPage: NextPage<GroupPageProps> = ({group}) => {
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
        <h1>Group {group.name}</h1>
        <p>{group.description}</p>
        <Row xs={2} md={4} className="g-4">
          {group.images.map((image) => (
            <Col key={image.id}>
              <Card>
                <Card.Img variant="top" src={image.url} title={image.filename}/>
                <Card.Footer className="text-muted">{image.filename}</Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = parseInt(context.query.id as string);
  const group = await getOneGroup(id);

  // Pass data to the page via props
  return {props: {group}};
};

export default GroupPage;
