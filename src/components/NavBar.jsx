import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <ul className='navbar-nav mr-auto'>
          <NavLink className='nav-link nav=item' to='home'>
            Home
          </NavLink>
          <NavLink className='nav-link nav=item' to='trainingCourses'>
            Training Courses
          </NavLink>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
