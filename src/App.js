
import './App.css';
import { BiArchive} from "react-icons/bi"
import Search from './components/Search';
import AppointmentInfo from './components/AppointmentInfo';
import AddAppointment from './components/AddApponitment';
import { useEffect, useCallback, useState } from "react";
function App() {

  let [appointmentList, setAppointmentList] = useState([]);
  let [query, setQuery] = useState("");
  const filteredAppointments = appointmentList.filter(item =>{
    return (
      item.petName.toLowerCase().includes(query.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
      item.aptNotes.toLowerCase().includes(query.toLowerCase()) 
    )
  })
  const fetchData = useCallback(() => {
    fetch('./data.json')
    .then(response => response.json())
    .then(data => {
      setAppointmentList(data);
    })
  },[])

  useEffect(() => {
    fetchData();
  },[fetchData]);

  return (
    <div className="App container mx-auto mt-3 font-thin">   
        <h1 className='text-5xl'><BiArchive/> Vetrinary Appointments</h1>
       <Search query={query} onQueryChange={myQuery => setQuery(myQuery)} />
       <AddAppointment/>
<ul>
{
  filteredAppointments.map(appointment =>
    <AppointmentInfo  appointment={appointment} onDeleteAppointment={
      appointmentId => setAppointmentList(appointmentList.filter(appointment=>appointment.id !== appointmentId))
    } key={appointment.id}/>
  )
}
</ul>
    </div>
  );
}

export default App;
