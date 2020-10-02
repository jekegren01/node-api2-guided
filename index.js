const express = require("express")
const server = express()
const port = 4000

//Step 4: import back individual Router as needed
const usersRouter = require("./users/users-router")
const welcomeRouter = require("./users/welcome-router")


server.use(express.json())
//Step 5: use the Router, (optional first parameter for nesting a route prefix)
server.use(usersRouter)
server.use(welcomeRouter)

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
