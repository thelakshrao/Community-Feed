import { useEffect, useState } from 'react';
import API from './api';
import Comment from './components/Comment';

function App() {
  const [posts, setPosts] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [content, setContent] = useState(""); 
  const [commentText, setCommentText] = useState({}); 

  const fetchData = async () => {
    try {
      const postRes = await API.get('posts/');
      const leaderRes = await API.get('leaderboard/');
      setPosts(postRes.data);
      setLeaderboard(leaderRes.data);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    await API.post('posts/', { content });
    setContent("");
    fetchData();
  };

  const handleLike = async (postId) => {
    await API.post(`posts/${postId}/like/`);
    fetchData(); 
  };

  const handleComment = async (postId) => {
    const text = commentText[postId];
    if (!text || !text.trim()) return;
    await API.post(`posts/${postId}/comment/`, { content: text });
    setCommentText({ ...commentText, [postId]: "" });
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="md:col-span-2 space-y-6">
          <h1 className="text-3xl font-black text-gray-900">Community Feed</h1>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
            <form onSubmit={handlePost}>
              <textarea 
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="What's happening?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button type="submit" className="bg-blue-600 text-white px-8 py-2 rounded-full font-bold mt-2">Post</button>
            </form>
          </div>

          {posts.map(post => (
            <div key={post.id} className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
              <span className="font-bold text-blue-600">@{post.author.username}</span>
              <p className="text-gray-900 my-4 text-2xl font-medium">{post.content}</p>
              
              <div className="flex items-center justify-between border-t pt-4">
                <span className="text-gray-500 font-bold">{post.likes_count} Likes</span>
                <button onClick={() => handleLike(post.id)} className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold">Like</button>
              </div>

              <div className="mt-4 flex gap-2">
                <input 
                  className="grow p-2 border rounded-lg outline-none focus:ring-1 focus:ring-blue-400"
                  placeholder="Add a comment..."
                  value={commentText[post.id] || ""}
                  onChange={(e) => setCommentText({...commentText, [post.id]: e.target.value})}
                />
                <button onClick={() => handleComment(post.id)} className="bg-gray-800 text-white px-4 py-2 rounded-lg font-bold text-sm">Reply</button>
              </div>
              
              <div className="mt-6 bg-gray-50 p-4 rounded-xl">
                <p className="text-xs font-bold text-gray-400 uppercase mb-4">Comments</p>
                {post.comments.map(c => <Comment key={c.id} comment={c} />)}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl h-fit border border-gray-200 sticky top-8">
          <h2 className="text-xl font-bold mb-6">Karma Leaderboard</h2>
          {leaderboard.map((user, index) => (
            <div key={user.username} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl mb-2">
              <span className="font-semibold">{index + 1}. @{user.username}</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">{user.karma} pts</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;