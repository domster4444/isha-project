import React from "react";

const JobCard = ({ companyName, jobName, location, jobSkill }) => {
  return (
    <div>
      <div className='job_card'>
        <div className='image-container'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYlwyUqYgRNXLsoBj8UUkSXuPiV-orOIrsvQFSPQG2Lg&s' alt='' />
        </div>
        <div className='job-main-detail'>
          <div className='sub-heading'>
            <h4>{companyName}</h4>
            <div className='tag tag-blue'> &nbsp;New! &nbsp;</div>
            <div className='tag tag-black'> &nbsp; Featured! &nbsp;</div>
          </div>

          <strong>{jobName}</strong>

          <div className='job-time-details'>
            <ul>
              {/* <li>1d ago.</li> */}
              <li>Full Time</li>
              <li> {location}</li>
            </ul>
          </div>
          <p className='job-description ' style={{ visibility: "hidden" }}>
            This job requires the eligible candidate to complete following test tasks to prove their proficiency in their related fields .
          </p>
        </div>
        <div className='job-tag'>
          {(() => {
            if (jobSkill !== null) {
              return jobSkill.map((reptile) => <div className='tag tag-blue'> &nbsp;{reptile}&nbsp;</div>);
            }
          })()}

          {/* <div className='tag tag-blue'> &nbsp;NODEJs &nbsp;</div>
          <div className='tag tag-blue'> &nbsp;JEST&nbsp;</div>
          <div className='tag tag-blue'> &nbsp;MONGODB&nbsp;</div>
          <div className='tag tag-blue'> &nbsp;REDUX&nbsp;</div>
          <div className='tag tag-blue'> &nbsp;EXPRESS&nbsp;</div> */}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
