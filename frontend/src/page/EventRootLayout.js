import React from 'react'
import EventsNavigation from '../components/EventsNavigation';
import { Outlet } from 'react-router-dom';

function EventRootLayout() {
  return (
    <div>
        <EventsNavigation/>
        <Outlet/>
    </div>
  )
}

export default EventRootLayout