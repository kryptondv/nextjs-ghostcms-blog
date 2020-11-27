import { useState, useEffect } from 'react';
import { loadComments } from 'utils/disqs';

interface Props {
  post: object
}


const CommentsSection: React.FC<Props>= ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  
    useEffect(() => {
      showComments && loadComments(post);
    }, [showComments]);

  return (
    <div>
      {!showComments && (
        <button onClick={() => setShowComments(true)}>Load Comments</button>
      )}
      <div id="disqus_thread"></div>
    </div>
  );
};

export default CommentsSection;
