const { Router } = require("express");
const express = require("express");
const { loginGoogles } = require("../controllers/loginGoogles");

const router = Router();
router.use(express.json());

router.post("/", async (req, res) => {
 
  let { email, family_name, given_name, google_id, locale, name, picture, verified_email } = req.body;   

  try {

      let newUser = await loginGoogles({
      email,
      family_name,
      given_name,
      google_id,
      locale,
      name,
      picture,
      verified_email,           
      });     
      res.status(201).json(newUser);
  } catch (Error) {
    // console.log(Error.message)
    res.status(400).json({message:  `User with google_id: ${google_id}, already exists in the database`})

  }
});

module.exports = router;