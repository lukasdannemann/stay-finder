import { Hono } from "hono";
import { authValidator } from "../validators/authValidation.js";
import { requireAuth } from "../middleware/auth.js";

const auth = new Hono();

// POST /auth/register
auth.post("/register", authValidator, async (c) => {
  const { email, password } = c.req.valid("json");
  const supabase = c.get("supabase");

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return c.json({ error: error.message }, 400);
  }

  return c.json({ user: data.user }, 201);
});

// POST /auth/login
auth.post("/login", authValidator, async (c) => {
  const { email, password } = c.req.valid("json");
  const supabase = c.get("supabase");

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return c.json({ error: "Fel email eller lösenord" }, 401);
  }

  return c.json({ user: data.user });
});

// POST /auth/logout
auth.post("/logout", requireAuth, async (c) => {
  const supabase = c.get("supabase");
  await supabase.auth.signOut();
  return c.json({ message: "Logged out" });
});

// GET /auth/me
auth.get("/me", (c) => {
  const user = c.get("user");

  if (!user) {
    return c.json({ user: null }, 401);
  }

  return c.json({ user: { id: user.id, email: user.email } });
});

export default auth;