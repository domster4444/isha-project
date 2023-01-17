import { Container, Stack, Heading } from "@chakra-ui/react";
import Builder from "./Builder";
import ResumePreview from "./ResumePreview";
import { useReactToPrint } from "react-to-print";
import { useResume } from "../Context";

import Button from "./Button/Button";

const Main = () => {
  const { printElem } = useResume();

  const handlePrint = useReactToPrint({
    content: () => printElem.current,
  });

  return (
    <Container bg={"gray.50"} minW={"full"} py={10} id='builder'>
      <div>
        <button className='button-9' style={{ marginBottom: "1rem" }} onClick={handlePrint}>
          Download
        </button>
      </div>
      <div className='builder-container'>
        <Builder />
        <ResumePreview />
      </div>
    </Container>
  );
};

export default Main;
