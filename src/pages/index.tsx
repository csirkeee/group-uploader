import type { GetServerSideProps, NextPage } from 'next';

import { getAllGroups } from "../services/groupService";
import { Group } from "../dtos/group";
import Link from "next/link";
import { Container, ListGroup } from "react-bootstrap";

type IndexPageProps = {
  allGroups: Group[];
}

const IndexPage: NextPage<IndexPageProps> = ({allGroups}) => {
  return (
    <Container>
      <h1 className="mt-3">Group uploader app</h1>
      <h3 className="mt-3">Currently uploaded groups:</h3>
      <ListGroup>
        {allGroups.map((group) =>
          <ListGroup.Item key={group.id}>
            Group name is {group.name}, has {group.images.length} members <Link
              href={`/groups/${group.id}`}>
              details
            </Link>
          </ListGroup.Item>
        )}
      </ListGroup>
      <hr/>

      <Link href="/upload">Upload new group</Link>
    </Container>
  );
};

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async () => {
  const allGroups = await getAllGroups();

  // Pass data to the page via props
  return {props: {allGroups}};
};

export default IndexPage;
