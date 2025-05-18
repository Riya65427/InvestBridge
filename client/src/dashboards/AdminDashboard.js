import { useEffect, useState } from 'react';
import API from '../api/axios';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        API.get('/admin/users').then(res => setUsers(res.data));
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
            <table className="table-auto w-full">
                <thead>
                    <tr><th>Name</th><th>Email</th><th>Role</th></tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u._id}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;