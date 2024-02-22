// Header component
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const Header = (props) => {
    const navigate = useNavigate(); // Use the useNavigate hook
    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:5000/logout');
            props.token()
            navigate("/")
        }
        catch(error){
            console.log(error)
             console.error('Logout:', error.response ? error.response.data.message : error.message);
        }

    }
    return (
      <header className='header'>
        <h1 className='header-content'>Search Bot</h1>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button> 
      </header>
    );
  };
  export default Header;
