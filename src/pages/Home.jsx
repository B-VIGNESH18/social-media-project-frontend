import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import API from "../utils/api";
import Post from "../components/Post";
import "../components/Post.css"; // Make sure this file includes your grid and card styles

const Home = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from your backend when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts");
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error.response?.data || error.message);
      }
    };
    fetchPosts();
  }, []);

  // Delete handler: sends a DELETE request and removes the post from state
  const handleDeletePost = async (postId) => {
    try {
      await API.delete(`/posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error.response?.data || error.message);
    }
  };

  // Like toggle handler: for now, simply logs the like/unlike action
  const handleLikeToggle = (postId, liked) => {
    console.log(`Post ${postId} like toggled: ${liked}`);
    // Optionally: make an API call here to update like count in the backend
  };

  return (
    <Container sx={{ marginTop: "80px" }}>
      {posts.length === 0 ? (
        <Typography variant="h6" align="center">
          No posts available yet. Be the first to post!
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Post
                post={post}
                onDelete={handleDeletePost}
                onLikeToggle={handleLikeToggle}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;




