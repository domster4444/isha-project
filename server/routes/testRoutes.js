const express = require("express");
const router = express.Router();

const { merojobscontrol, allMerojobscontrol } = require("../controllers/testController");

router.route("/test").get(merojobscontrol);
router.route("/test/all").get(allMerojobscontrol);

module.exports = router;
