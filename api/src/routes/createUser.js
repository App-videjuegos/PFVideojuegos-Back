const { Router } = require("express");
const express = require("express");
const { createUser } = require("../controllers/createUser");

const router = Router();
router.use(express.json());

router.post("/", async (req, res) => {
 
  let { id, user, password, fullname, userAdmin, email, date, image, phone, tac, newsLetter } = req.body;   

  try {

      let newUser = await createUser({
      id,
      user,
      password,
      fullname,
      userAdmin,
      email,
      date,
      image,
      phone,
      tac,
      newsLetter,           
      });


      res.status(201).json({message: 'Usuario creado exitosamente', data: newUser});
  } catch (Error) {
    console.log(Error.message)
    if(Error.message.includes(email))res.status(400).json({ message: "The email address is already associated with another account."});
    if(Error.message.includes(phone))res.status(400).json({ message: "The phone is already associated with another account." });
    if(Error.message.includes(user))res.status(400).json({ message: "The user is already assigned to another user." });
    if(Error.message.includes(id))res.status(400).json({ message: "UserId already exists" });
  }
});

module.exports = router;
