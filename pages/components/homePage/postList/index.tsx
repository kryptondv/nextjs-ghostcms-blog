import Link from 'next/link';
import PostPreview from '../postPreview';

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
            <a>
              <PostPreview title={title} excerpt={custom_excerpt} />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
