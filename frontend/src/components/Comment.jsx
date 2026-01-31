import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div className="ml-6 border-l-2 border-gray-100 pl-4 mt-3">
      <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
        <p className="text-xs font-bold text-blue-600">@{comment.author.username}</p>
        <p className="text-sm text-gray-800">{comment.content}</p>
      </div>
      {comment.replies && comment.replies.map(reply => (
        <Comment key={reply.id} comment={reply} />
      ))}
    </div>
  );
};

export default Comment;