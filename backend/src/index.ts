import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { env } from './env.js'
import properties from './routes/properties.js'
import bookings from './routes/bookings.js'
import { optionalAuth } from './middleware/auth.js'
import auth from './routes/auth.js'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('*', cors({
  origin: env.frontendUrl,
  credentials: true,
}))

app.use('*', optionalAuth)

app.route('/properties', properties)
app.route('/bookings', bookings)
app.route('/auth', auth)

serve({
  fetch: app.fetch,
  port: env.honoPort
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
