import { useNavigate } from "react-router-dom";
import { updateProfile } from "../adapters/user-adapter";

export default function UpdateProfileForm({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const [user, error] = await updateProfile(Object.fromEntries(formData));
    // If our user isn't who they say they are
    // (an auth error on update) log them out
    // We added the httpStatus as a custom cause in our error
    if (error?.cause > 400 && error?.cause < 500) {
      setCurrentUser(null);
      return navigate('/');
    }

    setCurrentUser(user);
    event.target.reset();
  };

  return <form onSubmit={handleSubmit} aria-labelledby="update-heading">
    <h2 id="update-heading">Update User {currentUser.email} </h2>
    <label htmlFor='email'>New Email</label>
    <input type='text' id='email' name='email' />
    <input type="hidden" name="id" value={currentUser.id} />

    <button>Update Email</button>
  </form>;
}
