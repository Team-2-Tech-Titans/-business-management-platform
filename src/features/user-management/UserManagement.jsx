import React from 'react';
import UserList from './UserList';
import { useDispatch } from 'react-redux';
import { blockUser, unblockUser } from '../../redux/actions/userActions';

const UserManagement = () => {
    const dispatch = useDispatch();

    const handleBlockUser = (userId) => {
        dispatch(blockUser(userId));
    };

    const handleUnblockUser = (userId) => {
        dispatch(unblockUser(userId));
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">User Management</h1>
            <UserList />

            <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
                <p>
                    Use the buttons in the user list to block or unblock users. Blocking a user will prevent them from logging in until they are unblocked.
                </p>
            </div>
        </div>
    );
};

export default UserManagement;
