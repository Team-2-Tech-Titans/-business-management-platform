import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, blockUser, unblockUser } from '../redux/actions/userActions'; // Use fetchUsers
import Spinner from '../components/Spinner'; // Make sure the Spinner is correctly implemented

const UserManagementPage = () => {
    const dispatch = useDispatch();
    const { users: clients, loading, error } = useSelector((state) => state.user);

    // Fetch clients on mount
    useEffect(() => {
        dispatch(fetchUsers()); // Call fetchUsers instead of fetchClients
    }, [dispatch]);

    const handleBlockUser = (clientId) => {
        dispatch(blockUser(clientId));
    };

    const handleUnblockUser = (clientId) => {
        dispatch(unblockUser(clientId));
    };

    if (loading) return <Spinner />;

    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">User Management</h1>

            {clients.length === 0 ? (
                <p className="text-gray-500">No clients found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">
                                    Name
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">
                                    Email
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">
                                    Phone
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">
                                    Address
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">
                                    Status
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((client) => (
                                <tr key={client.id} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b border-gray-200">{client.name}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{client.email}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{client.phone}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{client.address}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">
                                        {client.isBlocked ? (
                                            <span className="text-red-500">Blocked</span>
                                        ) : (
                                            <span className="text-green-500">Active</span>
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-200">
                                        {client.isBlocked ? (
                                            <button
                                                onClick={() => handleUnblockUser(client.id)}
                                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                            >
                                                Unblock
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleBlockUser(client.id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
            )}
        </div>
    );
};

export default UserManagementPage;
