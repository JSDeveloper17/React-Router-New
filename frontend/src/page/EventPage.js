
import { json, useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';

function EventsPage() {
    const events = useLoaderData()
    if(events.isError){
        return <p>{events.message}</p>
    }
  return (
    <>
     <EventsList events={events} />
    </>
  );
}

export async function loader() {
    const res = await fetch('http://localhost:8080/events')
    if(!res.ok){
        return {isError:true, message: "failed to fetch"}
        //? using json(react-router-dom) 
        // return json({message:"could not fetch events"},
        //     {status:500}
        // )
    }
    const data = await res.json()
    return data.events
}
export default EventsPage;