const { request, response } = require("express");
const bcrypt = require("bcrypt");
const Users = require("../model/users");
const { generalToken } = require("../helpers/jwt");

const registerUser = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;

    let user = await Users.findOne({ email });

    if (user) {
      return res.status(401).json({
        message: "Email alredy used",
      });
    }

    user = new Users(req.body);

    const salt = bcrypt.genSaltSync();

    user.password = bcrypt.hashSync(password, salt);

    const token = await generalToken(user._id, user.name);

    await user.save();

    res.status(201).json({
      id: user._id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Comunicarse con soporte tecnico",
    });
  }
};

const login = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.json({
        message: "Email or password incorrect",
      });
    }

    const validPasword = bcrypt.compareSync(password, user.password);

    if (!validPasword) {
      return res.json({
        message: "Email or password incorrect",
      });
    }

    const token = await generalToken(user._id, user.name);

    res.json({
      id: user._id,
      name: user.name,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Comunicarse con soporte tecnico",
    });
  }
};

const renewToken = async (req = request, res = response) => {
  const id = req.id;
  const name = req.name;

  try {
    const token = await generalToken(id, name);

    res.json({
      id,
      name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Comunicarse con soporte tecnico",
    });
  }
};

module.exports = {
  registerUser,
  login,
  renewToken,
};
