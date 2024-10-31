import { Link } from "react-router-dom";

export default function UserLink({ user }) {
  return <Link to={`/users/${user.id}`}>{user.first_name} {user.last_name}</Link>;
}

