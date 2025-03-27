import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import escape from 'html-escape'
import htmlEscape from 'html-escape'

dotenv.config()

const PORT = process.env.PORT || 3000;

const app = express()

app.use(express.json())

app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'"],
        "style-src": ["'self'"],
        "font-src": ["'self'"],
      },
    },
}))

app.post("/", (req, res) => {
  const {email, password, message} = req.body;

  const sanitizeData = {
    email: htmlEscape(email),
    password: htmlEscape(password),
    message: htmlEscape(message)
  }


  console.log(`Dados recebidos: ${req.body}`)
  res.json({message: "Formulário enviado com sucesso!"});
})

app.get("/", (req,res) => {

  res.send(`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <form method="post">
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Email address</label>
            <input type="email" name="email" placeholder="name@example.com">
        </div>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Password</label>
            <input type="password" name="password" placeholder="********">
        </div>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Mensagem</label>
            <input type="text" class="form-control" name="message">
        </div>
        <button type="submit" class="btn btn-primary">Enviar</button>
    </form>
    <script src="/src/server.js" type="module"></script>
</body>

</html>`)
})

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`)
})