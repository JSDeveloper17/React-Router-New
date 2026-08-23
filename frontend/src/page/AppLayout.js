import React from 'react'
import MainNavigation from '../components/MainNavigation';
import { Outlet, useNavigation } from 'react-router-dom';

function AppLayout() {
    const loadingStatus = useNavigation()
    //console.log(loadingStatus)
    
  return (
    <div>
        <MainNavigation/>
        <main>
            {loadingStatus.state === "loading"? <p>Data  Fetching....</p>:""}
          <Outlet/>
        </main>
    </div>
  )
}

export default AppLayout