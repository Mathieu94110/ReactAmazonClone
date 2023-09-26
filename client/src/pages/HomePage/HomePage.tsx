import { useContext } from "react";
import { AuthContext } from "../../components/context/AuthContext";

function Homepage() {
  const { user, signout } = useContext(AuthContext);
  return (
    <>
      <h1>Homepage</h1>
      <ul>
        <li>Nom : {user.name}</li>
        <li>Email : {user.email} </li>
      </ul>
      <button onClick={() => signout()}>Se déconnecter</button>
    </>
  );
}

export default Homepage;
