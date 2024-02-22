// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FileUploadPage from './components/fileUpload';
import SearchComponent from './components/search';
import FileListPage from './components/fileList';
import useToken from './components/useToken'
import Login from './components/login';
import Header from './components/header'
import SideBar from './components/sideBar'
import Footer from './components/footer'
import './App.css';

const App = () => {

  const { token, removeToken, setToken } = useToken();
  return(
  <Router>
      <div className="app-container">
        {!token && token !== "" && token !== undefined ? (
          <Login setToken={setToken} />
        ) : (
          <>
            <Header token={removeToken} className="header" />
            <div className="app-content">
              <SideBar token={token} className="sidebar" />
              <main className="main-content">
                <div className="main-content-container">
                  <Routes>
                    <Route
                      exact
                      path="/search"
                      element={<SearchComponent token={token} setToken={setToken} />}
                    ></Route>
                    <Route
                      path="/upload"
                      element={<FileUploadPage token={token} setToken={setToken} />}
                    />
                    <Route
                      path="/fileList"
                      element={<FileListPage token={token} setToken={setToken} />}
                    />
                  </Routes>
                </div>
              </main>
            </div>
            <Footer className="footer" />
          </>
        )}
      </div>
    </Router>
  )
};

export default App;
