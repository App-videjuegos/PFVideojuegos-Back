const { Router } = require("express");
const express = require("express");
const { loginGoogles } = require("../controllers/loginGoogles");

const router = Router();
router.use(express.json());

router.post("/", async (req, res) => {
 
  let { id, email, family_name, given_name, google_id, locale, name, picture, verified_email } = req.body;   

  try {

      let newUser = await loginGoogles({
      id,
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
  } catch (error) {
    // console.log(error)
    res.status(400).json(error.message)

  }
});

module.exports = router;