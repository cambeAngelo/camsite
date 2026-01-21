import { getAllUsers } from "./admin.repository.js";

export const getRegisteredUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json({
      ok: true,
      data: users,
      count: users.length,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      ok: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

export const getUserStats = async (req, res) => {
  try {
    const users = await getAllUsers();
    const totalUsers = users.length;
    const admins = users.filter((u) => u.role === "admin").length;
    const regularUsers = totalUsers - admins;

    res.json({
      ok: true,
      data: {
        totalUsers,
        admins,
        regularUsers,
        users,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({
      ok: false,
      message: "Failed to fetch stats",
      error: error.message,
    });
  }
};
