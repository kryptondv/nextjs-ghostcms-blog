import Link from 'next/link';

interface Props {
  posts: { title: string; id: string; slug: string; custom_excerpt: string }[];
}

const PostList: React.FC<Props> = props => {
  const { posts } = props;
  return (
    <ul>
      {posts.map(({ title, id, slug, custom_excerpt }) => (
        <li key={id}>
          <Link href={`/posts/${slug}`}>
            <a>{title}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
