import { Hono } from 'hono';

const auth = new Hono({
    strict: false
});

auth.post('/register', async (c) => {
    const { email, password} = await c.req.json();

    try {
        const sb = c.get('supabase')
        const response = await sb.auth.signUp({
            email,
            password
        })
        console.log('SUPABASE FROM REQ', sb)
        return c.json(response, 501)

    } catch (error) {
        return c.json({ error: 'Failed to register user' }, 500);
    }
});

export default auth;