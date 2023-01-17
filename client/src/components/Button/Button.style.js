import styled, { css } from "styled-components";

export const PrimaryBtn = styled.button`
  color: white;
  padding: 0.55rem 0.45rem;
  width: 100%;
  background: #9b371e;
  ${(props) =>
    props.primary
      ? css`
          font-size: 2.2rem;
        `
      : props.secondary
      ? css``
      : props.tertiary
      ? css``
      : css``};

  &:active {
    transform: scale(0.9);
    transition: all ease 200ms;
  }
`;
