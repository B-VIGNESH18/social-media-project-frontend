

// import React, { useState, useContext, useEffect } from "react";
// import { 
//   Card, 
//   CardMedia, 
//   CardContent, 
//   Typography, 
//   CardActions, 
//   IconButton, 
//   Box, 
//   TextField, 
//   Button,
//   Tooltip
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt"; // Filled icon for liked
// import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"; // Outlined icon for unliked
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// import { AuthContext } from "../context/AuthContext";
// import API from "../utils/api";
// // import "./Post.css"; // Import our custom CSS for posts

// const Post = ({ post, onDelete = () => {}, onLikeToggle }) => {
//   // Build image URL from backend response (supports both property names)
//   const actualImagePath = post.imageUrl || post.image_url;
//   const imageSrc = actualImagePath 
//     ? `https://social-media-project-backend-1.onrender.com${actualImagePath}` 
//     : "https://placehold.co/345x200?text=No+Image";

//   // Like state management
//   const { user: currentUser } = useContext(AuthContext);
//   const [liked, setLiked] = useState(post.liked || false);
//   const [likeCount, setLikeCount] = useState(post.likeCount || 0);
//   const [likedBy, setLikedBy] = useState(post.likedBy || []);

//   // Comments state
//   const [comments, setComments] = useState([]);
//   const [showComments, setShowComments] = useState(false);
//   const [commentText, setCommentText] = useState("");

//   // Fetch comments when comment section is toggled on
//   useEffect(() => {
//     if (showComments) {
//       fetchComments();
//     }
//   }, [showComments]);

//   const fetchComments = async () => {
//     try {
//       const res = await API.get(`/comments/${post.id}`);
//       setComments(res.data);
//     } catch (error) {
//       console.error("Error fetching comments:", error.response?.data || error.message);
//     }
//   };

//   const handleLikeToggle = () => {
//     if (liked) {
//       setLiked(false);
//       setLikeCount(likeCount - 1);
//       setLikedBy(likedBy.filter(name => name !== currentUser.username));
//       onLikeToggle && onLikeToggle(post.id, false);
//     } else {
//       setLiked(true);
//       setLikeCount(likeCount + 1);
//       setLikedBy([...likedBy, currentUser.username]);
//       onLikeToggle && onLikeToggle(post.id, true);
//     }
//   };

//   const handleDelete = () => {
//     if (window.confirm("Are you sure you want to delete this post?")) {
//       onDelete(post.id);
//     }
//   };

//   const toggleComments = () => {
//     setShowComments(prev => !prev);
//   };

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (!commentText.trim()) return;
//     try {
//       const res = await API.post(
//         "/comments",
//         { postId: post.id, content: commentText },
//         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//       );
//       setComments([...comments, res.data]);
//       setCommentText("");
//     } catch (error) {
//       console.error("Error adding comment:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <Card className="post-card">
//       <CardMedia
//         component="img"
//         className="post-media"
//         image={imageSrc}
//         alt={actualImagePath ? "Post image" : "No image available"}
//       />
//       <CardContent className="post-content">
//         <Typography gutterBottom variant="h6">
//           {post.username}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {post.content}
//         </Typography>
//       </CardContent>
//       <CardActions className="post-actions">
//         <IconButton onClick={handleDelete} color="error" aria-label="delete post">
//           <DeleteIcon />
//         </IconButton>
//         <IconButton onClick={handleLikeToggle} aria-label="like post">
//           {liked ? <ThumbUpAltIcon color="primary" /> : <ThumbUpOffAltIcon color="primary" />}
//         </IconButton>
//         <Tooltip title={likedBy.length > 0 ? likedBy.join(", ") : "No likes yet"}>
//           <Typography variant="body2" className="like-count">{likeCount}</Typography>
//         </Tooltip>
//         <IconButton onClick={toggleComments} aria-label="toggle comments">
//           <ChatBubbleOutlineIcon color="primary" />
//         </IconButton>
//         <Typography variant="body2" className="comment-count">
//           {comments.length || post.commentCount || 0}
//         </Typography>
//       </CardActions>
//       {showComments && (
//         <Box className="post-comments">
//           <Typography variant="subtitle1" className="comments-title">
//             Comments
//           </Typography>
//           {comments.map(comment => (
//             <Box key={comment.id} className="comment-item">
//               <Typography variant="body2">
//                 <strong>{comment.username}:</strong> {comment.content}
//               </Typography>
//             </Box>
//           ))}
//           <Box component="form" onSubmit={handleCommentSubmit} className="comment-form">
//             <TextField
//               value={commentText}
//               onChange={(e) => setCommentText(e.target.value)}
//               placeholder="Add a comment..."
//               size="small"
//               fullWidth
//             />
//             <Button type="submit" variant="contained" size="small">Post</Button>
//           </Box>
//         </Box>
//       )}
//     </Card>
//   );
// };

// export default Post;
import React, { useState, useContext, useEffect } from "react";
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  CardActions, 
  IconButton, 
  Box, 
  TextField, 
  Button,
  Tooltip
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { AuthContext } from "../context/AuthContext";
import API from "../utils/api";

const Post = ({ post, onDelete = () => {}, onLikeToggle }) => {
  const actualImagePath = post.imageUrl || post.image_url;
  const imageSrc = actualImagePath 
    ? `https://social-media-project-backend-1.onrender.com${actualImagePath}` 
    : "https://placehold.co/600x300?text=No+Image";

  const { user: currentUser } = useContext(AuthContext);
  const [liked, setLiked] = useState(post.liked || false);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [likedBy, setLikedBy] = useState(post.likedBy || []);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments]);

  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${post.id}`);
      setComments(res.data);
    } catch (error) {
      console.error("Error fetching comments:", error.response?.data || error.message);
    }
  };

  const handleLikeToggle = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(likeCount - 1);
      setLikedBy(likedBy.filter(name => name !== currentUser.username));
      onLikeToggle && onLikeToggle(post.id, false);
    } else {
      setLiked(true);
      setLikeCount(likeCount + 1);
      setLikedBy([...likedBy, currentUser.username]);
      onLikeToggle && onLikeToggle(post.id, true);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      onDelete(post.id);
    }
  };

  const toggleComments = () => {
    setShowComments(prev => !prev);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const res = await API.post(
        "/comments",
        { postId: post.id, content: commentText },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setComments([...comments, res.data]);
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error.response?.data || error.message);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", my: 3, boxShadow: 3, borderRadius: 3 }}>
      <CardMedia
        component="img"
        image={imageSrc}
        alt={actualImagePath ? "Post image" : "No image available"}
        sx={{
          width: "100%",
          maxHeight: 400,
          objectFit: "cover",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6">
          {post.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={handleDelete} color="error" aria-label="delete post">
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={handleLikeToggle} aria-label="like post">
          {liked ? <ThumbUpAltIcon color="primary" /> : <ThumbUpOffAltIcon color="primary" />}
        </IconButton>
        <Tooltip title={likedBy.length > 0 ? likedBy.join(", ") : "No likes yet"}>
          <Typography variant="body2">{likeCount}</Typography>
        </Tooltip>
        <IconButton onClick={toggleComments} aria-label="toggle comments">
          <ChatBubbleOutlineIcon color="primary" />
        </IconButton>
        <Typography variant="body2">
          {comments.length || post.commentCount || 0}
        </Typography>
      </CardActions>
      {showComments && (
        <Box sx={{ px: 2, pb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Comments
          </Typography>
          {comments.map(comment => (
            <Box key={comment.id} sx={{ mb: 1 }}>
              <Typography variant="body2">
                <strong>{comment.username}:</strong> {comment.content}
              </Typography>
            </Box>
          ))}
          <Box component="form" onSubmit={handleCommentSubmit} sx={{ display: "flex", gap: 1, mt: 1 }}>
            <TextField
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              size="small"
              fullWidth
            />
            <Button type="submit" variant="contained" size="small">Post</Button>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default Post;
