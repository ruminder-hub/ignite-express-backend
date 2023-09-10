const UserModel = require("../models/user_model");
const bcrypt = require("bcrypt")

router.post('/login', async function(req, res) {
    console.log(`Request received $req.body`);
    console.log(req.body);
    let result = await verifyCredentials(req.body, res);
    return result;
});

router.post('/register', async function(req, res) {
    console.log(`Request received $req.body`);
    console.log(req.body);
    let result = await registerUser(req.body, res);
    return result;
});

verifyCredentials = async (loginCredentials, res) =>  {
    if (loginCredentials.username == undefined || loginCredentials.password == undefined) {
        return res.status(400).send("Provide username and password for the student");
      }
      UserModel.find({ username: loginCredentials.username})
      .then((result) => {
          if (result.length != 0) {
              return res.status(200).send("Either username or password is incorrect. Please try again");
            } else {
              console.log("Student not found in database creating one.");
              try {
                bcrypt.compare(loginCredentials.password, result[0].password,  function(err, result) {
                    if (result) {
                        return res.status(200).send({username: result[0].username, admin: true})
                    } else {
                        return res.status(200).send("Either username or password is incorrect. Please try again");
                    }
                });
              } catch(err) {
                console.log("Excpetion occurred while saving data");
                return res.status(500).send(err);
              }
            }
      })
      .catch((err) => {
          return res.status(500).send("Unexpected error occurred. Please try again");
      });
}

registerUser = async (loginCredentials, res) =>  {
    if (loginCredentials.username == undefined || loginCredentials.password == undefined) {
      return res.status(400).send("Provide username and password for the student");
    }
    UserModel.find({ username: loginCredentials.username})
    .then((result) => {
        if (result.length != 0) {
            return res.status(200).send(`User with $loginCredentials.username already exists`);
          } else {
            console.log("Student not found in database creating one.");
            try {
                bcrypt.genSalt(len(loginCredentials.password), (err, salt) => {
                    bcrypt.hash(plaintextPassword, salt, function(err, hash) {
                        // Store hash in the database
                        const user = new UsernModel({
                            username: loginCredentials.username,
                            password: hash
                        });
                        user.save().then((user_result) => {
                            let id = user_result.get("_id");
                            return res.status(200).send(stu_result)
                        })
                        .catch((error) => {
                            console.log("Error occurred");
                            console.log(error);
                            return res.status(500).json(error);
                        })
                    });
                })
            } catch(err) {
              console.log("Excpetion occurred while saving data");
              return res.status(500).send(err);
            }
          }
    })
    .catch((err) => {
        return res.status(500).send("Either username or password is incorrect. Please try again");
    });
}

module.exports = router;
