interface Props {
  title: string;
  html: string;
}

const Post: React.FC<Props> = ({title, html}) => {
  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
}

export default Post;
