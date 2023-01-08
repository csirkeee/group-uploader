import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import styles from '../../styles/Home.module.css';
import { getAllGroups, getOneGroup } from "../../services/groupService";
import { Group } from "../../dtos/group";
import Link from "next/link";

type GroupPageProps = {
  group: Group;
}

const GroupPage: NextPage<GroupPageProps> = ({group}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Group uploader</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <div className={styles.groups}>
        <div>
          <Link href="/">Home</Link>
        </div>
        <div key={group.id}>
          <p>Group name is {group.name}, has {group.images.length} members</p>
        </div>
        {group.images.map((image) =>
          <div key={image.id}>
            <p>Image name is {image.filename}, is at {image.url}</p>
          </div>
        )}
      </div>
    </div>
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
