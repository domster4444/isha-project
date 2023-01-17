import { Container, Stack, Heading } from "@chakra-ui/react";
import Builder from "./Builder";
import ResumePreview from "./ResumePreview";
import { useReactToPrint } from "react-to-print";
import { useResume } from "../Context";
import { toast } from "react-toastify";
import Button from "./Button/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../components/JobCard/JobCard";

const Main = () => {
  const { skills, setSkills } = useResume();
  const [fetchedJobsi, setFetchedJobi] = useState(null);
  const { printElem } = useResume();

  const handlePrint = useReactToPrint({
    content: () => printElem.current,
  });

  const recommendButtonClicked = async () => {
    if (skills.length <= 0) {
      toast("Sorry, the skills fields are empty fill them first.");
    } else {
      toast("Working on it, please wait");
      // send request to server to get recommended jobs
      // get array of skills

      let individualSkillArray = skills.map((x) => x.name);

      const urlToFetch = `http://localhost:5000/api/v1/test/all?skills=${JSON.stringify(individualSkillArray)}`;

      console.log(urlToFetch);
      await axios.get(urlToFetch, { timeout: 0 }).then((response) => {
        console.log("->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>response.data.data");
        console.log(response);
        setFetchedJobi(response.data.data);
        console.log("->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>response.data.data");
      });
    }
  };

  return (
    <>
      {/* // todo:=================================== */}
      <main>
        <div id='open-modal' class='modal-window' style={{ width: "100vw", background: "#9b371e7d" }}>
          <div>
            <a href='#' title='Close' class='modal-close'>
              Close
            </a>
            <h1> Recommended Jobs</h1>
            {(() => {
              if (fetchedJobsi) {
                return fetchedJobsi.map((item) => {
                  return <JobCard companyName={item.name} jobName={item.jobName} location={item.location} jobSkill={item.skills} />;
                });
              }
            })()}
          </div>
        </div>
      </main>
      {/* // todo:=================================== */}

      <Container bg={"gray.50"} minW={"full"} py={10} id='builder'>
        <div>
          <button className='button-9' style={{ marginBottom: "1rem" }} onClick={handlePrint}>
            Download
          </button>

          {(() => {
            return (
              <button onClick={recommendButtonClicked} className='button-9' style={{ marginBottom: "1rem", marginLeft: "2rem" }}>
                <a href={skills.length != 0 ? "#open-modal" : "#"}>Recommend Job</a>
              </button>
            );
          })()}
        </div>
        <div className='builder-container'>
          <Builder />
          <ResumePreview />
        </div>
      </Container>
    </>
  );
};

export default Main;
