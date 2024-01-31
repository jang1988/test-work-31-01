import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UsersList from './components/UsersList';
import UserDetail from './components/UserDetail';
import PostDetail from './components/PostDetail';
import AlbumDetail from './components/AlbumDetail';

function App() {
    return (
        <Routes>
            <Route path="/" element={<UsersList />} />
            <Route path="/user/:userId" element={<UserDetail />} />
            <Route path="/posts/:postId" element={<PostDetail />} />
            <Route path="/albums/:albumId" element={<AlbumDetail />} />
        </Routes>
    );
}

export default App;
