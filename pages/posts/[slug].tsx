import Link from 'next/link';
import { useRouter } from 'next/router';

const { BLOG_URL, CONTENT_API_KEY } = process.env;


const Post = props => {
  let post = props.posts;
  post = post.posts[0];
  const router = useRouter();
  if (router.isFallback) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <Link href="/">
        <a>Go back</a>
      </Link>
  <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
    </div>
  );
};

export default Post;

const getPost = async (slug: string) => {
  let res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/slug/${slug}/?key=${CONTENT_API_KEY}`
  );
  res = await res.json();
  return res;
};

export const getStaticProps = async ({ params }) => {
  const posts = await getPost(params.slug);
  return {
    props: { posts },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};