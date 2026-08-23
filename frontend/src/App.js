// Challenge / Exercise

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./page/Home";
import EventPage, {loader as EventLoader} from "./page/EventPage";
import EventDetail, {loader as EventDetailLoader, action as DeleteEventAction} from "./page/EventDetail";
import NewEventPage from "./page/NewEventPage";
import {action as ManipulateEventAction} from "./components/EventForm"
import EditEventPage from "./page/EditEventPage";
import AppLayout from "./page/AppLayout";
import EventRootLayout from "./page/EventRootLayout";
import Error from "./page/Error";
import NewsletterPage, { action } from "./page/Newsletter";

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component
//  above all /events... page components

function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element:<AppLayout/>,
      errorElement:<Error/> ,
      children:[
        {
          index:true,
          element:<Home/>
        },
        {
          path:"events",
          element:<EventRootLayout/>,
          children:[
            {
              index:true,
              element:<EventPage/>,
              loader: EventLoader,
              errorElement:<Error/>
            },
            {
              path:":id",
              id:"event-detail",
              //todo to use higher level loader data we use useRouteLoaderData("id")
              loader: EventDetailLoader,
              children:[
                {
                  index:true,
                  element:<EventDetail/>,
                  action: DeleteEventAction
                },
                {
                   path:"edit",
                   element:<EditEventPage/>,
                   action: ManipulateEventAction
                },
              ]
            },
            
            {
              path:"new",
              element:<NewEventPage/>,
              action: ManipulateEventAction
              //* loader - load data 
              //? action - send data
            },
            
          ]
        },
        {
          path:"newsletter",
          element:<NewsletterPage/>,
          action: action
        }
      ]
    }
    
  ])
  return <RouterProvider router={router}/>;
}

export default App;
