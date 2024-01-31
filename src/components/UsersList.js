import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './UsersList.module.css';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('username');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                let filteredUsers = response.data;

                if (searchTerm && sortField === 'username') {
                    filteredUsers = filteredUsers.filter((user) =>
                        user.username.toLowerCase().includes(searchTerm.toLowerCase()),
                    );
                } else {
                    filteredUsers = filteredUsers.filter((user) =>
                        user.name.toLowerCase().includes(searchTerm.toLowerCase()),
                    );
                }

                filteredUsers.sort((a, b) => {
                    const aValue = a[sortField];
                    const bValue = b[sortField];
                    if (sortOrder === 'asc') {
                        return aValue.localeCompare(bValue);
                    } else {
                        return bValue.localeCompare(aValue);
                    }
                });

                setUsers(filteredUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [searchTerm, sortField, sortOrder]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortField(event.target.value);
    };

    const handleOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    return (
        <div className={styles.container}>
            <h1>Users List</h1>

            <input
                type="text"
                placeholder="Search by username"
                value={searchTerm}
                onChange={handleSearchChange}
            />

            <div>
                <label htmlFor="sortField">Sort & Find by:</label>
                <select id="sortField" value={sortField} onChange={handleSortChange}>
                    <option value="username">Username</option>
                    <option value="name">Name</option>
                </select>

                <label htmlFor="sortOrder">Order:</label>
                <select id="sortOrder" value={sortOrder} onChange={handleOrderChange}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <Link to={`/user/${user.id}`} className={styles.link}>
                            {user.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
