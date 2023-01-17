import Logo from "../../images/isha-logo.png";

import styled from "styled-components";
import { Link } from "react-router-dom";
const Nav = styled.nav`
  background: #f2f2f2;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 2rem;
  ul {
    align-items: center;
    justify-content: space-between;
    display: flex;
    list-style: none;
    li {
      font-weight: bold;
      color: #9b371e;
    }
  }
`;
const LogoImg = styled.img`
  height: 40px;
`;

const Navbar = () => {
  return (
    <>
      <Nav>
        <ul>
          <li>
            <LogoImg src={Logo} alt='' />
          </li>

          <ul>
            <Link to='/'>
              <li
                className='nav-link'
                style={{ display: "flex", cursor: "pointer", alignItems: "center", margin: "0rem 1rem", padding: "0.75rem 0.75rem" }}
              >
                Home
              </li>
            </Link>
            <Link to='explorejobs'>
              <li
                className='nav-link'
                style={{ display: "flex", cursor: "pointer", alignItems: "center", margin: "0rem 1rem", padding: "0.75rem 0.75rem" }}
              >
                Explore Jobs
              </li>
            </Link>
          </ul>
        </ul>
      </Nav>
    </>
  );
};

export default Navbar;
