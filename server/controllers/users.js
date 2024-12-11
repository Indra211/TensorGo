const { userScheama } = require("../models");
const { verifyGoogleToken } = require("../utils/helpers");
const { authenticate } = require("../middlewares/Authenticate");
const router = require("express").Router();

router.post("/google/auth", async (req, res, next) => {
  try {
    const { token } = req.body;
    const payload = await verifyGoogleToken(token);
    let user = await userScheama.findOne({ email: payload.email });

    if (!user) {
      const newUser = await fetch("https://api.intercom.io/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.INTERCOM_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          email: payload.email,
          role: "user",
          name: payload.name,
        }),
      });
      const interComResponse = await newUser.json();
      user = await userScheama.create({
        googleId: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        interComId: interComResponse.id,
      });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Google Authentication Error:", error);
    res.status(401).send("Invalid token");
  }
});

router.get("/get", authenticate, async (req, res, next) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    next(error);
  }
});

router.put("/update", authenticate, async (req, res, next) => {
  try {
    const { name, picture } = req.body;
    await fetch(`https://api.intercom.io/contacts/${req.user.interComId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.INTERCOM_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        name,
      }),
    });
    const user = await userScheama.findOneAndUpdate(
      { email: req.user.email },
      {
        $set: {
          name,
        },
      },
      { new: true }
    );
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  userRouter: router,
};
