import React, { useState, useMemo, useEffect } from 'react';
import Menu from './src/components/Menu';
import GameLauncher from './src/pages/GameLauncher';
import Profile from './src/pages/Profile';

function App() {
    const [currentPage, setCurrentPage] = useState('/GameLauncher');
    const [isLogedIn, setIsLogedIn] = useState(false);

    const handlePopState = (event: any) => {
        event.preventDefault();
        if (window.location.pathname == '/') {
            navigateTo('/GameLauncher');
        } else {
            setCurrentPage(window.location.pathname);
        }
      };

    useEffect(() => {
        window.addEventListener('popstate', handlePopState);
        window.addEventListener('locationchange', handlePopState);
        return (() => {
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('locationchange', handlePopState);
        });
    }, []);

    const navigateTo = (path: string) => {
        // push an entry into the browser history stack and change the URL
        window.history.pushState({
            
        }, undefined, path);
        setCurrentPage(path);
    };

    const logout = () => {

    };

    console.log("current page", currentPage);
    return (
        <React.Fragment>
            <Menu navigateTo={navigateTo} logout={logout} />
            <div style={{marginTop: '50px'}}>
                {currentPage == '/GameLauncher' && <GameLauncher />}
                {currentPage == '/Profile' && <Profile />}
                {currentPage == '/Game' && <GameLauncher />}
                {currentPage == '/Friends' && <GameLauncher />}
                {}
            </div>
        </React.Fragment>
    );
}

export default App;