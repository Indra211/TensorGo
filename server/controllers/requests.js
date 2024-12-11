const { authenticate } = require("../middlewares/Authenticate");
const { requestSchema } = require("../models");

const router = require("express").Router();

router.post("/create", authenticate, async (req, res, next) => {
  try {
    const { category, comment } = req.body;
    const newRequest = await fetch("https://api.intercom.io/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.INTERCOM_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        from: {
          type: "user",
          email: req.user.email,
        },
        body: `Category: ${category}\nComments: ${comment}`,
      }),
    });
    const response = await newRequest.json();

    const request = await requestSchema.create({
      userId: req.user._id,
      category,
      comment,
      ...response,
    });
    res.status(201).json(request);
  } catch (error) {
    next(error);
  }
});

router.get("/all", authenticate, async (req, res, next) => {
  try {
    const requests = await requestSchema.find({
      userId: req.user._id,
    });
    res.json(requests);
  } catch (error) {
    next(error);
  }
});

module.exports = {
  requestRouter: router,
};
