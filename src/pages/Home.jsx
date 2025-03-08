// import { useEffect, useState } from "react";
// import API from "../utils/api";
// import PostList from "../components/PostList";

// const Home = () => {
//     const [posts, setPosts] = useState([]);

//     useEffect(() => {
//         const fetchPosts = async () => {
//             const res = await API.get("/posts");
//             setPosts(res.data);
//         };
//         fetchPosts();
//     }, []);

//     return <PostList posts={posts} />;
// };

// export default Home;



import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import API from "../utils/api";
import Post from "../components/Post";

const Home = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from your backend on component mount
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

  return (
    <Container sx={{ marginTop: 8 }}>
      {posts.length === 0 ? (
        <Typography variant="h6" align="center">
          No posts available yet. Be the first to post!
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
