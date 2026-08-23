import React from 'react'
import { json,  redirect,  useRouteLoaderData } from 'react-router-dom';
import EventItem from '../components/EventItem';

function EventDetail() {
  //todo to use higher level loader data we use useRouteLoaderData("id")
  const data= useRouteLoaderData("event-detail")
  
  return (
   <EventItem event={data.event}/>
  )
}

export async function loader({request,params}) {
  //! request for queary parameter
  const eventId= params.id
   const response = await fetch(`http://localhost:8080/events/${eventId}`)
   if(!response.ok){
      throw json({message:"count not fetch event Detail"},
          {status: 500}
      )
   }else{
    return response
   }
}
export async function action({request,params}) {
   const eventId = params.id;

   const response = await fetch(`http://localhost:8080/events/${eventId}`,{

    method:request.method
    //method:"DELETE"
   })

   if(!response.ok){
      throw json({message:"count not fetch event Detail"},
          {status: 500}
      )
   }
   return redirect("/events")
}
export default EventDetail