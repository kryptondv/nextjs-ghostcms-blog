import Head from 'next/head';
import styles from '../styles/Home.module.scss';

const { BLOG_URL, CONTENT_API_KEY } = process.env;

interface Props {
  posts: { posts: { title: string; id: string }[] };
}

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

const Home: React.FC<Props> = props => {
  console.log(props);
  const {
    posts: { posts },
  } = props;

  return (
    <div className={styles.container}>
      <h1>My Blog</h1>
      <ul>
        {posts.map(({ title, id }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
