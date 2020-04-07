const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const errorHandler = require("../middleware/errorHandler");
const Project = require("../models/projectModel");
const User = require("../models/userModel");
const checkToken = require("../middleware/check-auth");
const config = require("../../config/config");
var nodemailer = require("nodemailer");

router.post("/create", checkToken, (req, res, next) => {
  const payload = req.body;
  const project = new Project({
    name: payload.name,
    description: payload.description,
    userId: payload.userId,
    startDate: payload.startDate,
    endDate: payload.endDate,
    participants: payload.participants,
  });
  project
    .save()
    .then((result) => {
      res.status(200).json({
        status: 200,
        data: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error,
        status: 500,
      });
    });
});

router.post("/update", checkToken, (req, res, next) => {
  const payload = req.body;
  const project = {
    name: payload.name,
    description: payload.description,
    userId: payload.userId,
    startDate: payload.startDate,
    endDate: payload.endDate,
    participants: payload.participants,
  };

  Project.replaceOne({ _id: payload._id }, project)
    .then((result) => {
      res.status(200).json({
        status: 200,
        data: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error,
        status: 500,
      });
    });
});

router.get("/:projectId/invite", checkToken, (req, res, next) => {
  const projectId = req.params.projectId;
  Project.find({ _id: projectId }, (err, result) => {
    if (err) errorHandler(res, err);
    User.findById(result[0].userId, (err, userResult) => {
        if (err) errorHandler(res, err);
      result[0].participants.map((rater) => {
        const token = jwt.sign(
          {
            projectId: projectId,
            raterId: rater._id,
          },
          config.JWT_KEY
        );
        const mailOptions = {
          from: config.EMAIL,
          to: config.EMAIL, // ratee.email
          subject: "Invitation to attend Performance Review",
          html: `<div>You have been invited to attend Performance Reviews by <b>${userResult.name}</b>. <a href="http://localhost:3000/project/rate?token=${token}">Click here to start rating</a><div>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (err) {
            errorHandler(res, err);
          } else {
            res.status(200).json({
              data: info.response,
              status: 200,
            });
          }
        });
      });
    });
  });
});

router.get("/rating", (req, res, next) => {
  const data = jwt.decode(req.query.token);
  const raterId = data.raterId;
  Project.findById(data.projectId, (err, result) => {
    User.findById(result.userId, (err, userResult) => {
      if (err) errorHandler(res, err);
      const ratees = [];
      let rater = null;
      result.participants.map((participant) => {
          if(rater === null && participant._id == raterId){
              rater = {
                  _id: participant._id,
                  name: participant.name
          }
        }

        const isRater =
          participant.raters.filter((rater) => rater._id == raterId).length > 0;
        if (isRater) {
          ratees.push({
            _id: participant._id,
            name: participant.name,
            email: participant.email,
            position: participant.position,
            isSelf: participant._id == raterId,
          });
        }
      });

      res.status(200).json({
        data: {
          name: result.name,
          description: result.description,
          startDate: result.startDate,
          endDate: result.endDate,
          invitedBy: userResult,
          rater,
          ratees,
        },
        status: 200,
      });
    });
  });
});

router.get("/getAll", checkToken, (req, res, next) => {
  Project.find({ userId: req.userData.id }, (err, result) => {
    if (err) errorHandler(res, err);
    res.status(200).json({
      data: result,
      status: 200,
    });
  });
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.EMAIL,
    pass: config.EMAIL_PASSWORD,
  },
});

module.exports = router;
