import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { loadComments } from '../../utils/disqs';

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
  const [comments, setComments] = useState(false);

  const post = props.posts.posts[0];

  const router = useRouter();
  if (router.isFallback) {
    return <h2>Loading...</h2>;
  }

  useEffect(() => {
    comments && loadComments(post);
  }, [comments]);

  return (
    <div>
      <Link href="/">
        <a>Go back</a>
      </Link>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
      {!comments && (
        <button onClick={() => setComments(true)}>Load Comments</button>
      )}
      <div id="disqus_thread"></div>
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
