

import { useEffect, useState, useContext } from "react";
import API from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import PostList from "../components/PostList";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;
        const fetchUserPosts = async () => {
            const res = await API.get(`/posts?user_id=${user.id}`);
            setPosts(res.data);
        };
        fetchUserPosts();
    }, [user]);

    return (
        <div>
            <h2>{user?.username}'s Profile</h2>
            <Button variant="contained" color="secondary" onClick={() => { logout(); navigate("/login"); }}>
                Logout
            </Button>
            <PostList posts={posts} />
        </div>
    );
};

export default Profile;
