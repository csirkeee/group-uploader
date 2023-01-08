import type { NextPage } from 'next';
import Head from 'next/head';

import Counter from '../features/counter/Counter';
import styles from '../styles/Home.module.css';
import { getAllGroups } from "../services/groupService";
import { Group } from "../dtos/group";

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
      <header className={styles.header}>
        <img src="/logo.svg" className={styles.logo} alt="logo"/>
        <Counter/>
        {allGroups.map((group) =>
          <div key={group.id}>
            <p>Group name is {group.name}, has {group.images.length} members</p>
          </div>
        )}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className={styles.link}
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className={styles.link}
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className={styles.link}
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className={styles.link}
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
};

// This gets called on every request
export async function getServerSideProps() {
  const allGroups = await getAllGroups();

  // Pass data to the page via props
  return {props: {allGroups}};
}

export default IndexPage;
