
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
  const filteredAppointments = appointmentList.filter(
    item => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      )
    }
  ).sort((a, b) => {
    let order = (orderBy === 'asc') ? 1 : -1;
    return (
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order : 1 * order
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
       <Search 
        orderBy={orderBy}
        onOrderByChange={myOrder=>setOrderBy(myOrder)} 
        sortBy={sortBy}
        onSortByChange={mySort=>setSortBy(mySort)}
        query={query} 
        onQueryChange={myQuery => setQuery(myQuery)} />
         
 <AddAppointment
        onSendAppointment={myAppointment => setAppointmentList([...appointmentList, myAppointment])}
        lastId={appointmentList.reduce((max, item) => Number(item.id) > max ? Number(item.id) : max, 0)}
      />
<ul className='divide-y divide-gray-200'>
{
  filteredAppointments.map(appointment => (
    <AppointmentInfo key={appointment.id} appointment={appointment} onDeleteAppointment={appointmentId => setAppointmentList(appointmentList.filter(appointment=>appointment.id !== appointmentId))
    } />
  ))
}
</ul>
    </div>
  );
}

export default App;
