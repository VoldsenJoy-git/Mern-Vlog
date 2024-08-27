import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
    navigate('/'); // Redirect to home after logout
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">BlogMaster</Link>
      <nav>
        {username && (
          <>
            <button onClick={() => navigate('/create')}>Create new post</button>
            <button onClick={logout}>Logout ({username})</button>
          </>
        )}
        {!username && (
          <>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/register')}>Register</button>
        
          </>
        )}
      </nav>
    </header>
  );
}
