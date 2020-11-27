import Head from 'next/head';
import styles from 'styles/Home.module.scss';
import PostList from 'components/homePage/postList';

const { BLOG_URL, CONTENT_API_KEY } = process.env;

interface Props {
  posts: {
    posts: {
      title: string;
      id: string;
      slug: string;
      custom_excerpt: string;
    }[];
  };
}

const Home: React.FC<Props> = props => {
  const {
    posts: { posts },
  } = props;

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="First next js blog"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <h1>My Blog</h1>
      <PostList posts={posts} />
    </div>
  );
};

export default Home;

const getPosts = async () => {
  let res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,slug,custom_excerpt,id`
  );
  res = await res.json();
  return res;
};

export const getStaticProps = async () => {
  const posts = await getPosts();
  return {
    props: { posts },
  };
};
