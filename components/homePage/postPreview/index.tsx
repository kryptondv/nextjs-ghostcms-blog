interface Props {
  title: string;
  excerpt: string;
}

const PostPreview: React.FC<Props> = ({ title, excerpt }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{excerpt}</p>
    </div>
  );
};

export default PostPreview;
