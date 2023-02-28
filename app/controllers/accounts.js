/** @format */
const Accounts = require("../models/accounts");
const accounts = new Accounts();

const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).send({ message: "Unauthorized." });
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Unauthorized." });
    accounts.findOne(decoded.id, (err, account) => {
      if (err)
        return res.status(500).send({ message: "Internal Server Error" });
      if (!account) return res.status(401).send({ message: "Unauthorized." });

      const accessToken = jwt.sign(
        { id: account.acc_id },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 900000,
      });

      res.status(200).json({
        message: "Token refreshed.",
        account,
      });
    });
  });
};

module.exports = {
  refreshToken,
};
