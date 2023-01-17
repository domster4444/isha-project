import React from "react";

import { Navigation, NavList, NavListItem } from "./Nav.style";
import { Link, Navigate } from "react-router-dom";

//? Step 1 For implementing active link feat
import { useLocation } from "react-router-dom";
//? -------------------------------------------

import isAuth from "services/isAuth";

import { DataRemovalMiddleware } from "services/AuthStorageMiddleware";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Nav = () => {
  const navigate = useNavigate();

  //? Step 2 For implementing active link feat
  const location = useLocation();
  console.log(location);
  //? -------------------------------------------

  const isActive = (path) => {
    if (location.pathname === path) {
      return { color: "red" };
    } else {
      return { color: "#A66EFE" };
    }
  };

  return (
    <Navigation>
      <NavList>
        <NavList>
          <NavListItem disableHover className='poppins_regular'>
            <Link to='/' style={isActive("/")}>
              <img
                src='https://i.imgur.com/Umq3gjJ.png'
                style={{
                  height: "4rem",
                }}
                alt=''
              />
            </Link>
          </NavListItem>
        </NavList>
        <NavList className='poppins_regular'>
          {!isAuth() && (
            <>
              <NavListItem>
                {/* protected nav link */}
                <Link to='/' style={isActive("/login")}>
                  Login
                </Link>
              </NavListItem>
              <NavListItem>
                <Link to={isAuth() ? "/" : "/register"} style={isActive("/register")}>
                  Register
                </Link>
              </NavListItem>
            </>
          )}

          {isAuth() && (
            <>
              <NavListItem>
                <Link to='/home'>Home</Link>
              </NavListItem>
              <NavListItem>
                <Link to='/explorejobs'>Explore jobs</Link>
              </NavListItem>

              <NavListItem>
                <a
                  onClick={() => {
                    DataRemovalMiddleware(() => {
                      toast.success("loggedout successfully");
                      navigate("/"); //! not doing this will not update menus 'name" in navbar, even if you log out, still it will show you "logout" menu and "userName" menu, this will force rerender navbar again hence updating menus
                    });
                  }}
                >
                  Logout
                </a>
              </NavListItem>

              <NavListItem>
                <a>{isAuth().name}</a>
              </NavListItem>
            </>
          )}
        </NavList>
      </NavList>
    </Navigation>
  );
};

export default Nav;
