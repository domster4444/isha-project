import styled, { css } from "styled-components";

const Navigation = styled.nav`
  padding: 1.45rem 0rem;
  background-color: var(--primary-white);
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const NavListItem = styled.ul`
  a {
    border-radius: 0.25rem;
    font-size: 2rem;
    margin: 0.25rem 1rem;
    padding: 0.75rem 1rem;
    cursor: pointer;
    color: var(--primary-violet);
    &:hover {
      ${(props) =>
        props.disableHover
          ? ""
          : css`
              background: var(--primary-violet);
              color: white !important;
            `};
    }
  }
`;

export { Navigation, NavList, NavListItem };
