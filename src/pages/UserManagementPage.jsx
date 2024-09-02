import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { blockUser, unblockUser, fetchUsers } from '../redux/actions/userActions';
import { useEffect } from 'react';

const UserManagementPage = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.userList);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleBlockUser = (userId) => {
        dispatch(blockUser(userId));
    };

    const handleUnblockUser = (userId) => {
        dispatch(unblockUser(userId));
    };

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">User Management</h1>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Status</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="py-2 px-4 border-b">{user.name}</td>
                            <td className="py-2 px-4 border-b">{user.email}</td>
                            <td className="py-2 px-4 border-b">
                                {user.isBlocked ? 'Blocked' : 'Active'}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {user.isBlocked ? (
                                    <button
                                        onClick={() => handleUnblockUser(user.id)}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Unblock
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleBlockUser(user.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Block
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagementPage;
