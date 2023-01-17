import styled from "styled-components";

const Footer = styled.footer`
  background: ${(props) => (props.primary ? "blue" : props.secondary ? "green" : props.tertiary ? "red" : "#ccc")};
  color: black;
`;

export default Footer;
// Language: typescript
