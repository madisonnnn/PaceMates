import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);

  return <header>
    <a id='logo' href='/'>PaceMates</a>
    <nav>
      <ul>
        <li><NavLink to='/'>Home</NavLink></li>

        {
          currentUser
            ? <>
              {/* Create a Dashboard page -> when sign in have it directly link here?*/}
                {/* Dashboard will include -> upcoming events, button to "join more events", past events*/}
                {/* No more home page? */}
              <li><NavLink to='/events'>Events</NavLink></li>
              {/* <li><NavLink to='/users' end={true}>Users</NavLink></li> */}
              {/* <li><NavLink to={`/users/${currentUser.id}`}>Fix Name {currentUser.firstName} {currentUser.lastName}</NavLink></li> */}
            </>
            : <>
              <li><NavLink to='/events'>Events</NavLink></li>
              <li><NavLink to='/login'>Login</NavLink></li>
              {/* more straightforward to have login -> can navigate to sign-up if needed */}
              {/* <li><NavLink to='/sign-up'>Sign Up</NavLink></li> */}
            </>
        }
      </ul>
    </nav>
  </header>;
}
