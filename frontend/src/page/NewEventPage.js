import React from 'react'
import EventForm from '../components/EventForm';
import { json, redirect } from 'react-router-dom';

function NewEventPage() {
  return (
     <EventForm/>
  )
}

export default NewEventPage

export  async function action({request,params}) {
  const data = await request.formData()

  const eventData = {
    title: data.get("title"),
    date:data.get("date"),
    image:data.get("image"),
    description:data.get("description")
  }
  console.log(eventData)
  const response = await fetch("http://localhost:8080/events",{
    method: "POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify(eventData)
  })

  if(!response.ok){
    throw json({message:"could not save event"},{status: 500})
  }

  return redirect("/events")
}