import { registerUser, loginUser, getUserById, updateUserProfile } from "./auth.repository.js";

export async function register(req, res, next) {
  try {
    const { email, username, password, firstName, lastName } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ ok: false, error: "Missing required fields" });
    }

    if (password.length < 8) {
      return res.status(400).json({ ok: false, error: "Password must be at least 8 characters" });
    }

    const result = await registerUser({ email, username, password, firstName, lastName });
    return res.status(201).json({ ok: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ ok: false, error: "Email and password required" });
    }

    const result = await loginUser({ email, password });
    return res.json({ ok: true, data: result });
  } catch (err) {
    if (err.message.includes("Invalid")) {
      return res.status(401).json({ ok: false, error: err.message });
    }
    next(err);
  }
}

export async function getProfile(req, res, next) {
  try {
    const user = await getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ ok: false, error: "User not found" });
    }
    return res.json({ ok: true, data: user });
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req, res, next) {
  try {
    const allowed = ["firstName", "lastName", "bio", "avatarUrl", "website", "location", "isPublic"];
    const updates = {};
    
    Object.keys(req.body).forEach(key => {
      if (allowed.includes(key)) {
        const dbKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
        updates[dbKey] = req.body[key];
      }
    });

    const user = await updateUserProfile(req.user.id, updates);
    return res.json({ ok: true, data: user });
  } catch (err) {
    next(err);
  }
}
