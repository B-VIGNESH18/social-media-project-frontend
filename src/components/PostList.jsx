

import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import API from "../utils/api";
import Post from "./Post";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from API on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts");
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // Delete post function
  const handleDeletePost = async (postId) => {
    try {
      // Call API to delete post
      await API.delete(`/posts/${postId}`);
      // Update local state: filter out the deleted post
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error.response?.data || error.message);
    }
  };

  // Optionally: handle like toggle (if needed)
  const handleLikeToggle = (postId, liked) => {
    // You can implement API call for like/unlike if needed,
    // then update state similarly
    console.log(`Post ${postId} like toggled: ${liked}`);
  };

  return (
    <Container sx={{ marginTop: 4 }}>
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
    </Container>
  );
};

export default PostList;
