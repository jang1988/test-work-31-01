import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AlbumDetail = () => {
    const { albumId } = useParams();
    const [album, setAlbum] = useState({});

    useEffect(() => {
        const fetchAlbumData = async () => {
            try {
                const response = await axios.get(
                    `https://jsonplaceholder.typicode.com/albums/${albumId}`,
                );
                setAlbum(response.data);
            } catch (error) {
                console.error('Error fetching album data:', error);
            }
        };

        fetchAlbumData();
    }, [albumId]);

    return (
        <div>
            <h1>Album Detail</h1>
            <h2>{album.title}</h2>
        </div>
    );
};

export default AlbumDetail;
