import React from "react";
import { useParams } from "react-router-dom";

export default function Guidelines() {
  const { awardName } = useParams();
  const decodedName = decodeURIComponent(awardName);

  if (decodedName !== "Mundkur Memorial Award") {
    return (
      <div className="bg-white p-8 max-w-4xl mx-auto min-h-screen">
        <h1 className="text-4xl font-bold text-green-900 mb-6">Guidelines for {decodedName}</h1>
        <p className="text-gray-800 text-base leading-relaxed">
          No guidelines available for this award yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-5xl font-normal text-green-900 mb-6">
        Mundkur Memorial Lecture Award - Guidelines
      </h1>
      <div className="text-gray-800 text-base leading-relaxed space-y-6">
        <div>
          <b>Name of the Award</b>
          <div>Mundkur Memorial Lecture Award</div>
        </div>
        <div>
          <b>Value of the Award</b>
          <div>Facilitation with memento, citation, and shawl. The award does not carry any cash prize.</div>
        </div>
        <div>
          <b>Periodicity of the Award</b>
          <div>The Award shall be made annually</div>
        </div>
        <div>
          <b>Eligibility of the Award</b>
          <div>
            An active senior member of the Society of good standing who is above 50 and has made outstanding contributions in the field of Mycology (including Industrial/Medical Mycology) and Plant Pathology in general to cover all its disciplines recognized by the Society
          </div>
        </div>
        <div>
          <b>Administration of the Award</b>
          <div>
            The Society shall have the sole right of selection of the recipient of the award and of the formulation of rules governing such selection
          </div>
        </div>
        <div>
          <b>Procedure for selection of Recipients</b>
          <ol className="list-decimal list-inside space-y-2 mt-2">
            <li>Nominations will be invited by the Society for the award from the members of the Executive Committee (E.C.) of the Society. Nominations shall be accompanied by a bio-data indicating attainment of the candidate</li>
            <li>Nominations received will be scrutinized by a Screening Committee (SC) of three members constituted by E.C. If any member of the E.C. or SC is to be considered for the award, he/she shall cease to be a member of these committees</li>
            <li>After the acceptance of the recommendations of the Screening Committee by E.C., the award shall be offered</li>
            <li>The judging committee is required to disqualify any person for canvassing.</li>
            <li>Award can be given only once.</li>
            <li>After the acceptance of the recommendations of the Screening Committee by E.C., the award shall be announced.</li>
          </ol>
        </div>
        <div>
          <b>Presentation of the Award</b>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>
              After the acceptance of the names recommended by the Judging Committee by the Executive Council, it will be reported to the General Body. The Society will inform the recipient of his selection and request him/her to deliver a lecture in the next annual meeting of the Society. The lecture be printed in the journal (Indian Phytopathology) and it should be not exceed 15 printed pages.
            </li>
            <li>
              If a person selected for the lecture award is unable to deliver the lecture due to illness or other unavoidable circumstances during that year, he may deliver the lecture in the following year. However, the award will lapse, if he is unable to come for the lecture in the following year also.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 