import { useState, useContext } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const CreatePost = () => {
    const [form, setForm] = useState({ content: "", image: null });
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setForm({ ...form, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    console.log("Token before request:", token); // Debug token presence

    if (!token) {
        alert("You are not logged in. Please log in first.");
        return;
    }

    if (!form.image) {
        alert("Please select an image before posting.");
        return;
    }

    try {
        const formData = new FormData();
        formData.append("content", form.content);
        formData.append("image", form.image);
        // Note: If your backend requires a user_id, it's better to derive it from the token in the backend.
        // formData.append("user_id", user.id);

        const res = await API.post("/posts", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        console.log("Post created successfully:", res.data);
        navigate("/");
    } catch (error) {
        console.error("Failed to create post:", error.response?.data || error.message);
        alert(error.response?.data?.error || "Failed to create post.");
    }
};

    return (
        <Container>
            <Typography variant="h4">Create a Post</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="content"
                    label="What's on your mind?"
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <Button type="submit" variant="contained" color="primary">
                    Post
                </Button>
            </form>
        </Container>
    );
};

export default CreatePost;
