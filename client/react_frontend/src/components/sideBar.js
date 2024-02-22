import React from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Sidebar = (props) => {
  // Decode the JWT token to get user information
  const decodedToken = jwtDecode(props.token);
  console.log(decodedToken)
  // Extract user role from the decoded token
  const userRole = decodedToken['sub']['role'];
  console.log(userRole)

  return (
    <aside className={props.className}>
      <nav>
        <ul>
          <li><Link to="/search">Search</Link></li>

          {userRole === 'admin' && (
            <li><Link to="/upload">Upload Files</Link></li>  
          )}
        {userRole === 'admin' && (
            <li><Link to="/fileList">View Files</Link></li>
          )}
          {/* Add more sidebar links as needed */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
