// src/components/PostDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await axios.get(
                    `https://jsonplaceholder.typicode.com/posts/${postId}`,
                );
                setPost(response.data);
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };

        fetchPostData();
    }, [postId]);

    return (
        <div>
            <h1>Post Detail</h1>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </div>
    );
};

export default PostDetail;
