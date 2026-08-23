import { Form, useNavigate, useNavigation } from 'react-router-dom';
import { json, redirect } from 'react-router-dom';
import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation()

  const isSubmitting = navigation.state ==="submitting";


  function cancelHandler() {
    navigate('..');
  }

  return (
    //!This form will automatically trigger the action function of the currently active route,
    <Form method={method} className={classes.form}>
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required
            defaultValue={event ? event.title:""} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required 
             defaultValue={event ? event.image:""}/>
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required
            defaultValue={event ? event.date:""}/>
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required
            defaultValue={event ? event.description:""}/>
      </p>
      <div className={classes.actions}>
        <button type="button" disabled={isSubmitting} onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting...":"Save"}
          </button>
      </div>
    </Form>
  );
}

export default EventForm;


export  async function action({request,params}) {
  const method = request.method;
  const data = await request.formData()

  const eventData = {
    title: data.get("title"),
    date:data.get("date"),
    image:data.get("image"),
    description:data.get("description")
  }
  console.log(eventData)

  let url = "http://localhost:8080/events";

  if(method === "PATCH"){
    const eventId = params.id;
    url = `http://localhost:8080/events/${eventId}`
  }
  const response = await fetch(url,{
    method: method,
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