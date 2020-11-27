import Link from 'next/link';
import { useRouter } from 'next/router';
import CommentsSection from '../components/postPage/commentsSection';

import PostContent from '../components/postPage/postContent';

const { BLOG_URL, CONTENT_API_KEY } = process.env;

interface Props {
  posts: {
    posts: {
      title: string;
      html: string;
    }[];
  };
}

const Post: React.FC<Props> = props => {
  const post = props.posts.posts[0];
  const router = useRouter();

  if (router.isFallback) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <Link href="/">
        <a>Go back</a>
      </Link>
      <PostContent title={post.title} html={post.html} />
      <CommentsSection post={post} />
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
