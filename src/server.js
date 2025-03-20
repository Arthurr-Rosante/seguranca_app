import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import escape from 'html-escape'

dotenv.config()

const PORT = process.env.PORT || 3000;

const app = express()

app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'", "example.com"],
    
      },
    },
  }))

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`)
})