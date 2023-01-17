import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Layouts/Navbar";
import JobCard from "../components/JobCard/JobCard";
// https://merojob.com/search/?page=

const ExploreJobs = () => {
  const [fetchedJobs, setFetchedJob] = useState(null);

  const [isLoading, setLoading] = useState("true");
  console.log(fetchedJobs);

  const refetchPage = (pageNo) => {
    setLoading("true");
    axios.get(`http://localhost:5000/api/v1/test/?page=${pageNo}`).then((response) => {
      console.log(response.data.data);
      setFetchedJob(response.data.data);
      setLoading("false");
    });
  };
  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/test/?page=1").then((response) => {
      console.log("===========response.data.data");
      console.log(response.data);
      console.log("===========response.data.data");
      setFetchedJob(response.data.data);
      setLoading("false");
    });
  }, []);

  if (fetchedJobs === null || isLoading === "true") {
    // return <h1 style={{ fontSize: "5rem" }}> LOADING...</h1>;

    return (
      <>
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: "#99341A",
          }}
        >
          <section
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='57' height='57' viewBox='0 0 57 57' stroke='#fff'>
                <g fill='none' fill-rule='evenodd'>
                  <g transform='translate(1 1)' stroke-width='2'>
                    <circle cx='5' cy='50' r='5'>
                      <animate attributeName='cy' begin='0s' dur='2.2s' values='50;5;50;50' calcMode='linear' repeatCount='indefinite' />
                      <animate attributeName='cx' begin='0s' dur='2.2s' values='5;27;49;5' calcMode='linear' repeatCount='indefinite' />
                    </circle>
                    <circle cx='27' cy='5' r='5'>
                      <animate attributeName='cy' begin='0s' dur='2.2s' from='5' to='5' values='5;50;50;5' calcMode='linear' repeatCount='indefinite' />
                      <animate attributeName='cx' begin='0s' dur='2.2s' from='27' to='27' values='27;49;5;27' calcMode='linear' repeatCount='indefinite' />
                    </circle>
                    <circle cx='49' cy='50' r='5'>
                      <animate attributeName='cy' begin='0s' dur='2.2s' values='50;50;5;50' calcMode='linear' repeatCount='indefinite' />
                      <animate attributeName='cx' from='49' to='49' begin='0s' dur='2.2s' values='49;5;27;49' calcMode='linear' repeatCount='indefinite' />
                    </circle>
                  </g>
                </g>
              </svg>

              <h2
                style={{
                  color: "white",
                  fontSize: "1.2rem",
                  marginTop: "2rem",
                }}
              >
                Loading ...
              </h2>
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <div>
      <Navbar />

      {(() => {
        if (fetchedJobs) {
          return fetchedJobs.map((item) => {
            return <JobCard companyName={item.name} jobName={item.jobName} location={item.location} jobSkill={item.skills} />;
          });
        }
      })()}

      <div
        style={{
          marginLeft: "1rem",
        }}
      >
        <div style={{ fontSize: "1.6rem", marginTop: "1rem" }}>Pages</div>
        <button
          style={{ background: "#99341A", color: "white", borderRadius: "1rem", padding: ".55rem .85rem", margin: ".2rem" }}
          onClick={() => {
            refetchPage(1);
          }}
        >
          1
        </button>
        <button
          style={{ background: "#99341A", color: "white", borderRadius: "1rem", padding: ".55rem .85rem", margin: ".2rem" }}
          onClick={() => {
            refetchPage(2);
          }}
        >
          2
        </button>
        <button
          style={{ background: "#99341A", color: "white", borderRadius: "1rem", padding: ".55rem .85rem", margin: ".2rem" }}
          onClick={() => {
            refetchPage(3);
          }}
        >
          3
        </button>
        <button
          style={{ background: "#99341A", color: "white", borderRadius: "1rem", padding: ".55rem .85rem", margin: ".2rem" }}
          onClick={() => {
            refetchPage(4);
          }}
        >
          4
        </button>
        <button
          style={{ background: "#99341A", color: "white", borderRadius: "1rem", padding: ".55rem .85rem", margin: ".2rem" }}
          onClick={() => {
            refetchPage(5);
          }}
        >
          5
        </button>
        <button
          style={{ background: "#99341A", color: "white", borderRadius: "1rem", padding: ".55rem .85rem", margin: ".2rem" }}
          onClick={() => {
            refetchPage(6);
          }}
        >
          6
        </button>
        <button
          style={{ background: "#99341A", color: "white", borderRadius: "1rem", padding: ".55rem .85rem", margin: ".2rem" }}
          onClick={() => {
            refetchPage(6);
          }}
        >
          6
        </button>
        <button
          style={{ background: "#99341A", color: "white", borderRadius: "1rem", padding: ".55rem .85rem", margin: ".2rem" }}
          onClick={() => {
            refetchPage(7);
          }}
        >
          7
        </button>
        <button
          style={{ background: "#99341A", color: "white", borderRadius: "1rem", padding: ".55rem .85rem", margin: ".2rem" }}
          onClick={() => {
            refetchPage(8);
          }}
        >
          8
        </button>
        <button
          style={{ background: "#99341A", color: "white", borderRadius: "1rem", padding: ".55rem .85rem", margin: ".2rem" }}
          onClick={() => {
            refetchPage(9);
          }}
        >
          9
        </button>
        <button
          style={{ background: "#99341A", color: "white", borderRadius: "1rem", padding: ".55rem .85rem", margin: ".2rem" }}
          onClick={() => {
            refetchPage(10);
          }}
        >
          10
        </button>
        <button
          style={{ background: "#99341A", color: "white", borderRadius: "1rem", padding: ".55rem .85rem", margin: ".2rem" }}
          onClick={() => {
            refetchPage(10);
          }}
        >
          11
        </button>
        <button
          style={{ background: "#99341A", color: "white", borderRadius: "1rem", padding: ".55rem .85rem", margin: ".2rem" }}
          onClick={() => {
            refetchPage(10);
          }}
        >
          12
        </button>
        <button
          style={{ background: "#99341A", color: "white", borderRadius: "1rem", padding: ".55rem .85rem", margin: ".2rem" }}
          onClick={() => {
            refetchPage(10);
          }}
        >
          13
        </button>

        <button
          style={{ background: "#99341A", color: "white", borderRadius: "1rem", padding: ".55rem .85rem", margin: ".2rem" }}
          onClick={() => {
            refetchPage(14);
          }}
        >
          14
        </button>
      </div>
    </div>
  );
};

export default ExploreJobs;
