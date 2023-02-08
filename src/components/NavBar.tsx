import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <div>
            <nav
                style={{
                    background: '#66ccff',
                    borderColor: '#ccffff',
                    borderBottom: 'solid',
                }}
                className="navbar navbar-expand-lg"
            >
                <ul className="navbar-nav mr-auto">
                    <NavLink
                        style={{ color: 'white' }}
                        className="nav-link nav=item"
                        to="exercises"
                    >
                        All Exercises
                    </NavLink>
                    <NavLink
                        style={{ color: 'white' }}
                        className="nav-link nav=item"
                        to="trainingCourses"
                    >
                        Training Courses
                    </NavLink>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar
