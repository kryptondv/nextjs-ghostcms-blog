import Head from 'next/head';
import styles from '../styles/Home.module.scss';

const {BLOG_URL, CONTENT_API_KEY} = process.env

type Post = {};

const getPosts = async () => {
  let res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}`
  );
  res = await res.json();
  return res;
};

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts();
  return {
    props: { posts },
  };
};

const Home: React.FC<{ posts: Post[] }> = props => {
  return <div className={styles.container}></div>;
};

export default Home;
