// const ErrorHandler = require("../utils/errorHandler");
// const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
// const puppeteer = require("puppeteer");

// //? joi validator

// exports.testControl = catchAsyncErrors(async (req, res) => {
//   const pageNo = await req.query.page;
//   console.log(pageNo);

//   const browser = await puppeteer.launch({
//     headless: true,
//   });
//   const page = await browser.newPage();
//   await page.goto(`https://merojob.com/search/?page=${pageNo + 1}`);
//   const data = await page.evaluate(() => {
//     const apiData = [];

//     Array.from(document.querySelectorAll("#search_job .card-body")).map(async (eachEvent) => {
//       function objMap(obj, func) {
//         return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, func(v)]));
//       }

//       let eventObject = {
//         target: "bla bal bla",
//         name: "not available",
//         jobName: "not available",
//         location: "not available",
//         skill: [],
//       };
//       eventObject.name = await eachEvent.querySelectorAll("h1.media-heading a")[0].textContent.trimEnd(`\n`).trimStart(`\n`);
//       eventObject.jobName = await eachEvent.querySelectorAll("h3.h6 a")[0].textContent.trimEnd(`\n`).trimStart(`\n`);
//       const fetchedSkill = await eachEvent.getElementsByClassName("div.media div.media-body span.badge");
//       await objMap(fetchedSkill, async (eachSkill) => await eventObject.skills.push(eachSkill.textContent));
//       eventObject["target"] = await eachEvent.querySelectorAll("div.location span.text-muted span").textContent;
//       eventObject["location"] = await eachEvent.querySelectorAll("div.location span.text-muted span").textContent;
//       console.log(eventObject);
//       apiData.push(eventObject);
//     });
//     return apiData;
//   });
//   await res.status(200).json({
//     page: pageNo,
//     success: true,
//     message: `you  the test route  `,
//     data,
//   });

//   // new ErrorHandler("error thrown in testController", 400)
// });

const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const puppeteer = require("puppeteer");

exports.merojobscontrol = catchAsyncErrors(async (request, response, next) => {
  console.log(748484);
  console.log(request.query.page);
  const BASE_URL = `https://merojob.com/search/?page=${request.query.page}`;
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto(`${BASE_URL}`, { timeout: 0 });

  const events = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("#search_job .card-body")).map((eachEvent) => {
      function objMap(obj, func) {
        return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, func(v)]));
      }

      let eventObject = {
        name: "not available",
        jobName: "not available",
        location: "not available",
        skills: null,
      };

      const fetchedName = eachEvent.querySelectorAll("h1.media-heading a")[0];
      eventObject.name = fetchedName.textContent.trimEnd(`\n`).trimStart(`\n`);

      const fetchedCompany = eachEvent.querySelectorAll("div > div.col-8.col-lg-9.col-md-9.pl-3.pl-md-0.text-left > h3 > a")[0];
      if (fetchedCompany !== undefined) {
        eventObject.jobName = fetchedCompany.textContent.trimEnd(`\n`).trimStart(`\n`);
      }

      const skillToAdd = [];
      const allSkills = eachEvent.getElementsByClassName("badge-pill");
      objMap(allSkills, async (eachSkill) => skillToAdd.push(eachSkill.textContent));
      if (skillToAdd.length > 0) {
        eventObject.skills = skillToAdd;
      }

      const fetchedCompanyLocation = eachEvent.querySelectorAll("div > div.col-8.col-lg-9.col-md-9.pl-3.pl-md-0.text-left > div > div > div.media-body > span > span")[0];
      if (fetchedCompanyLocation !== undefined) {
        eventObject.location = fetchedCompanyLocation.textContent;
      }

      return eventObject;
    });
  });

  response.status(200).json({
    success: true,
    data: events,
  });
  //   await browser.close();
});

exports.allMerojobscontrol = catchAsyncErrors(async (request, response, next) => {
  console.log("allmero job hit");

  const data = [];

  for (let i = 1; i <= 2; i++) {
    const BASE_URL = `https://merojob.com/search/?page=${i}`;
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}`, { timeout: 0 });
    const events = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("#search_job .card-body")).map((eachEvent) => {
        function objMap(obj, func) {
          return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, func(v)]));
        }
        let eventObject = {
          name: "not available",
          jobName: "not available",
          location: "not available",
          skills: null,
        };
        const fetchedName = eachEvent.querySelectorAll("h1.media-heading a")[0];
        eventObject.name = fetchedName.textContent.trimEnd(`\n`).trimStart(`\n`);
        const fetchedCompany = eachEvent.querySelectorAll("div > div.col-8.col-lg-9.col-md-9.pl-3.pl-md-0.text-left > h3 > a")[0];
        if (fetchedCompany !== undefined) {
          eventObject.jobName = fetchedCompany.textContent.trimEnd(`\n`).trimStart(`\n`);
        }
        const skillToAdd = [];
        const allSkills = eachEvent.getElementsByClassName("badge-pill");
        objMap(allSkills, async (eachSkill) => skillToAdd.push(eachSkill.textContent));
        if (skillToAdd.length > 0) {
          eventObject.skills = skillToAdd;
        }
        const fetchedCompanyLocation = eachEvent.querySelectorAll("div > div.col-8.col-lg-9.col-md-9.pl-3.pl-md-0.text-left > div > div > div.media-body > span > span")[0];
        if (fetchedCompanyLocation !== undefined) {
          eventObject.location = fetchedCompanyLocation.textContent;
        }
        return eventObject;
      });
    });
    data.push(...events);
    await browser.close();
  }
  const reqSkillArray = JSON.parse(request.query.skills);
  console.log(reqSkillArray);
  console.log(typeof reqSkillArray);
  const titleCasedSkills = reqSkillArray.map((skill) => skill.charAt(0).toUpperCase() + skill.slice(1));
  console.log(titleCasedSkills);
  const filteredData = data.filter((job) => {
    if (!job.skills) return false;
    return job.skills.some((skill) => titleCasedSkills.includes(skill));
  });
  response.status(200).json({
    success: true,
    data: filteredData,
  });
});
