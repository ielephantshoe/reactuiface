
import './App.css';
import { BiArchive} from "react-icons/bi"
import Search from './components/Search';
import AppointmentInfo from './components/AppointmentInfo';
import AddAppointment from './components/AddApponitment';
import { useEffect, useCallback, useState } from "react";
function App() {

  let [appointmentList, setAppointmentList] = useState([]);
  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("petName");
  let [orderBy, setOrderBy] = useState("asc");
  const filteredAppointments = appointmentList.filter(item =>{
    return (
      item.petName.toLowerCase().includes(query.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
      item.aptNotes.toLowerCase().includes(query.toLowerCase()))
  }).sort((a,b) => {
      let order = (orderBy === 'asc') ? 1 : -1;
      return (
        a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? -1 : 1 * order
      )
  });
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
       <Search orderBy={orderBy}
        onOrderBy={orderBy}
        onOrderByChange={myOrder=>setOrderBy(myOrder)}
        onSortByChange={mySort=>setSortBy(mySort)}
        query={query} onQueryChange={myQuery => setQuery(myQuery)} />
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
