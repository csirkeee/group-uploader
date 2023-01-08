import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import styles from '../styles/Home.module.css';
import { getAllGroups } from "../services/groupService";
import { Group } from "../dtos/group";
import Link from "next/link";

type IndexPageProps = {
  allGroups: Group[];
}

const IndexPage: NextPage<IndexPageProps> = ({allGroups}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Group uploader</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <div className={styles.groups}>
        {allGroups.map((group) =>
          <div key={group.id}>
            <p>Group name is {group.name}, has {group.images.length} members <Link
              href={`/groups/${group.id}`}>
              details
            </Link></p>
          </div>
        )}
      </div>
    </div>
  );
};

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async () => {
  const allGroups = await getAllGroups();

  // Pass data to the page via props
  return {props: {allGroups}};
};

export default IndexPage;
