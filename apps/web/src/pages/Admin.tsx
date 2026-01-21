import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    if (!storedToken) {
      navigate("/login");
      return;
    }
    setToken(storedToken);
    fetchData(storedToken);
  }, [navigate]);

  const fetchData = async (authToken) => {
    try {
      setLoading(true);
      // Fetch users
      const usersRes = await fetch("http://localhost:5000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (usersRes.status === 403) {
        setError("You don't have admin access. Only admins can view this page.");
        setLoading(false);
        return;
      }

      if (!usersRes.ok) {
        throw new Error(`Failed to fetch users: ${usersRes.statusText}`);
      }

      const usersData = await usersRes.json();
      if (usersData.ok) {
        setUsers(usersData.data);
      }

      // Fetch stats
      const statsRes = await fetch("http://localhost:5000/api/admin/stats", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        if (statsData.ok) {
          setStats(statsData.data);
        }
      }
    } catch (err) {
      console.error("Error fetching admin data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p>{error}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-gray-400 text-sm mb-2">Total Users</h3>
              <p className="text-4xl font-bold">{stats.totalUsers}</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-gray-400 text-sm mb-2">Admins</h3>
              <p className="text-4xl font-bold text-blue-400">{stats.admins}</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-gray-400 text-sm mb-2">Regular Users</h3>
              <p className="text-4xl font-bold text-green-400">
                {stats.regularUsers}
              </p>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-slate-800 rounded-lg overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-2xl font-bold">Registered Users</h2>
            <p className="text-gray-400 mt-1">
              Total: {users.length} users
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-700">
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-slate-700 hover:bg-slate-700 transition"
                  >
                    <td className="px-6 py-4 text-sm">{user.id}</td>
                    <td className="px-6 py-4 text-sm font-medium">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {user.first_name && user.last_name
                        ? `${user.first_name} ${user.last_name}`
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="p-6 text-center text-gray-400">
              No users registered yet
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
