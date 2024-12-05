// import { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import CurrentUserContext from "../contexts/current-user-context";
// import { getUser } from "../adapters/user-adapter";
// import { logUserOut } from "../adapters/auth-adapter";
// import UpdateUsernameForm from "../components/UpdateUsernameForm";

// export default function UserPage() {
//   const navigate = useNavigate();
//   const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
//   const [userProfile, setUserProfile] = useState(null);
//   const [errorText, setErrorText] = useState(null);
//   const { id } = useParams();
//   const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

//   useEffect(() => {
//     const loadUser = async () => {
//       const [user, error] = await getUser(id);
//       if (error) return setErrorText(error.message);
//       setUserProfile(user);
//     };

//     loadUser();
//   }, [id]);

//   const handleLogout = async () => {
//     logUserOut();
//     setCurrentUser(null);
//     navigate('/');
//   };

//   if (!userProfile && !errorText) return null;
//   if (errorText) return <p>{errorText}</p>;

//   // What parts of state would change if we altered our currentUser context?
//   // Ideally, this would update if we mutated it
//   // But we also have to consider that we may NOT be on the current users page
//   const profileUsername = isCurrentUserProfile ? currentUser.username : userProfile.username;

//   return <>
//     <h1>{profileUsername}</h1>
//     {!!isCurrentUserProfile && <button onClick={handleLogout}>Log Out</button>}
//     <p>If the user had any data, here it would be</p>
//     <p>Fake Bio or something</p>
//     <p>Does this work:{currentUser.firstName}</p>
//     {
//       !!isCurrentUserProfile
//       && <UpdateUsernameForm currentUser={currentUser} setCurrentUser={setCurrentUser} />
//     }
//   </>;
// }


// import { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import CurrentUserContext from "../contexts/current-user-context";
// import { getUser } from "../adapters/user-adapter";
// import { logUserOut } from "../adapters/auth-adapter";
// import UpdateUsernameForm from "../components/UpdateUsernameForm";

// export default function UserPage() {
//   const navigate = useNavigate();
//   const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
//   const [userProfile, setUserProfile] = useState(null);
//   const [errorText, setErrorText] = useState(null);
//   const { id } = useParams();
//   const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

//   useEffect(() => {
//     const loadUser = async () => {
//       const [user, error] = await getUser(id);
//       if (error) return setErrorText(error.message);
//       setUserProfile(user);
//     };

//     loadUser();
//   }, [id]);

//   const handleLogout = async () => {
//     await logUserOut();
//     setCurrentUser(null);
//     navigate('/');
//   };

//   if (!userProfile && !errorText) return null;
//   if (errorText) return <p>{errorText}</p>;

//   // Access first_name and last_name from userProfile
//   const profileFirstName = isCurrentUserProfile ? currentUser.first_name : userProfile.first_name;
//   const profileLastName = isCurrentUserProfile ? currentUser.last_name : userProfile.last_name;

//   return (
//     <>
//       <h1>User Profile</h1>
//       <p>Name: {profileFirstName} {profileLastName}</p> {/* Display first and last name */}
//       {!!isCurrentUserProfile && <button onClick={handleLogout}>Log Out</button>}
//       <p>If the user had any data, here it would be</p>
//       <p>Fake Bio or something</p>
//       {
//         !!isCurrentUserProfile
//         && <UpdateUsernameForm currentUser={currentUser} setCurrentUser={setCurrentUser} />
//       }
//     </>
//   );
// }



import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import { logUserOut } from "../adapters/auth-adapter";
import UpdateUsernameForm from "../components/UpdateUsernameForm";

export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

  useEffect(() => {
    const loadUser = async () => {
      const [user, error] = await getUser(id);
      if (error) return setErrorText(error.message);
      
      console.log("Fetched User:", user); // Log the fetched user
      setUserProfile(user);
    };

    loadUser();
  }, [id]);

  const handleLogout = async () => {
    await logUserOut();
    setCurrentUser(null);
    navigate('/');
  };

  if (!userProfile && !errorText) return null;
  if (errorText) return <p>{errorText}</p>;

  const profileFirstName = isCurrentUserProfile ? currentUser.first_name : userProfile.first_name;
const profileLastName = isCurrentUserProfile ? currentUser.last_name : userProfile.last_name;

return (
  <>
    <h1>User Profile</h1>
    <p>Name: {profileFirstName} {profileLastName}</p> {/* Display first and last name */}
    {!!isCurrentUserProfile && <button onClick={handleLogout}>Log Out</button>}
    <p>If the user had any data, here it would be</p>
    <p>Fake Bio or something</p>
    {
      !!isCurrentUserProfile
      && <UpdateUsernameForm currentUser={currentUser} setCurrentUser={setCurrentUser} />
    }
  </>
);


  // const profileFirstName = isCurrentUserProfile ? currentUser.first_name : userProfile.first_name;
  // const profileLastName = isCurrentUserProfile ? currentUser.last_name : userProfile.last_name;

  // return (
  //   <>
  //     <h1>User Profile</h1>
  //     <p>Name: {profileFirstName} {profileLastName}</p> {/* Display first and last name */}
  //     {!!isCurrentUserProfile && <button onClick={handleLogout}>Log Out</button>}
  //     <p>If the user had any data, here it would be</p>
  //     <p>Fake Bio or something</p>
  //     {
  //       !!isCurrentUserProfile
  //       && <UpdateUsernameForm currentUser={currentUser} setCurrentUser={setCurrentUser} />
  //     }
  //   </>
  // );
}
