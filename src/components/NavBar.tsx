import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav
      style={{
        background: '#66ccff',
        borderColor: '#ccffff',
        borderBottom: 'solid',
      }}
      className="navbar navbar-expand"
    >
      <div>
        <ul className="navbar-nav ">
          <NavLink
            style={{ color: 'white' }}
            className="nav-link nav-item"
            to="exercises"
          >
            All Exercises
          </NavLink>
          <NavLink
            style={{ color: 'white' }}
            className="nav-link nav-item"
            to="trainingCourses"
          >
            Training Courses
          </NavLink>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
