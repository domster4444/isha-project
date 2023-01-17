import styled from "styled-components";

export const AlertField = styled.div`
  font-size: 1.8rem;
  color: white;
  padding: 0.75rem 0.25rem;
  border-radius: 0.75rem;
  background-color: ${(props) => (props.type === "success" ? "blue" : props.type === "error" ? "#FF7F7F" : props.type === "warning" ? "orange" : "violet")};
`;
