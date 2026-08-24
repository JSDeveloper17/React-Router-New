import { Suspense} from "react"
import { Await, defer, json, useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';

function EventsPage() {
    const {events} = useLoaderData()
    // if(events.isError){
    //     return <p>{events.message}</p>
    // }
  return (
    <>
    {/* The suspense component is a component which can be used in certain situations
      to show a fallback whilst we're waiting for other data to arrive.  */}
     <Suspense fallback={<p style={{textAlign:"center", color:"red"}}>Loading...</p>}>
        <Await resolve={events}>
            {(loadEvents)=> <EventsList events={loadEvents}/>}
        </Await>
     </Suspense>
    </>
  );
}
async function loadEvents() {
    const res = await fetch('http://localhost:8080/events')
    if(!res.ok){
        //return {isError:true, message: "failed to fetch"}
        //? using json(react-router-dom) 
        return json({message:"could not fetch events"},
            {status:500}
        )
    }
    const data = await res.json()
    return data.events
}

export function loader() {
    return defer({
        events: loadEvents()
    })
}
export default EventsPage;