const jwt = require("jsonwebtoken");

const generalToken = (id, name) => {
  try {
    return new Promise((resolve, reject) => {
      const payload = { id, name };

      jwt.sign(
        payload,
        process.env.JWTKEY,
        {
          expiresIn: "299d",
        },
        (err, token) => {

          if (err) {
            console.log(err);
            reject("no se pudo crear el token");
          }

          resolve(token);
        }
      );
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Comunicarse con soporte tecnico",
    });
  }
};

module.exports = {
     generalToken
}
