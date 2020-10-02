
//Steps to separate off end points using Router
//Step 1 : import express and Router to be able to export
const express = require("express");
const router = express.Router();
const users = require("./users-model");


//Step 3: bring the end point routes in from main file
router.get("/users", (req, res) => {
	users.find(req.query)
		.then((users) => {
			res.status(200).json(users)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the users",
			})
		})
})

router.get("/users/:id", (req, res) => {
	users.findById(req.params.id)
		.then((user) => {
			if (user) {
				res.status(200).json(user)
			} else {
				res.status(404).json({
					message: "User not found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the user",
			})
		})
})

router.post("/users", (req, res) => {
	if (!req.body.name || !req.body.email) {
		return res.status(400).json({
			message: "Missing user name or email",
		})
	}

	users.add(req.body)
		.then((user) => {
			res.status(201).json(user)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error adding the user",
			})
		})
})

router.put("/users/:id", (req, res) => {
	if (!req.body.name || !req.body.email) {
		return res.status(400).json({
			message: "Missing user name or email",
		})
	}

	users.update(req.params.id, req.body)
		.then((user) => {
			if (user) {
				res.status(200).json(user)
			} else {
				res.status(404).json({
					message: "The user could not be found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error updating the user",
			})
		})
})

router.delete("/users/:id", (req, res) => {
	users.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The user has been nuked",
				})
			} else {
				res.status(404).json({
					message: "The user could not be found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error removing the user",
			})
		})
})

// create endpoint that returns all the posts for a user

router.get("/users/:id/posts", (req, res) => {
    users.findUserPosts(req.params.id)
        .then((posts) => {
            //promise resolved successfully
            res.json(posts)
        })
        .catch((err) => {
            //log out the error for the developer
            console.log(err);
            //dont send the error back to the client
            res.status(500).json({
                message: "An error occurred and could not get user posts"
            })
        })
})

// create endpoint that returns a single post for a user
router.get("/users/:userId/posts/:postId", (req, res) => {
    users.findUserPostById(req.params.userId, req.params.postId)
    .then((post) => {
        if (post) {
            res.json(post)
        } else {
            res.status(404).json({
                message: "Post was not found"
            })
        }
    })
    .catch((err) => {
        //log out the error for the developer
        console.log(err);
        //dont send the error back to the client
        res.status(500).json({
            message: "An error occurred and could not get user posts"
        })
    })
})
// create endpoint for adding a new post for a user

router.post("/users/:id/posts", (req,res) => {
    if (!req.body.text) {
        return res.status(400).json({
            message: "Need a text value"
        })
    }
    users.addUserPost(req.params.userId, req.body)
    .then((post) => {
        res.status(201).json(post)
    })
    .catch((err) => {
        //log out the error for the developer
        console.log(err);
        //dont send the error back to the client
        res.status(500).json({
            message: "An error occurred and could not get user posts"
        })
    })

})


//Step 2: must export the router
module.exports = router;