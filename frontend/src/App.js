import './App.css';
import {useState,useEffect} from 'react';
import Axios from 'axios'



function App() {

  const [listOfUsers, setListOfUsers] = useState([]);
  const [name,setName] = useState('');
  const [age,setAge] = useState(1);
  const [username,setUsername] = useState('');

  useEffect(()=>{
    Axios.get('http://localhost:3002/getUsers').then((response)=>{
      setListOfUsers(response.data);
    })
  },[])

 const createUser= ()=>{
  Axios.post('http://localhost:3002/createUser',{name,age,username}).then((response)=>{
    alert("User created successfully")
  })
 }

 const updateUser= ()=>{
  Axios.put('http://localhost:3002/:id',{name,age,username}).then((response)=>{
    alert("User updated successfully")
  })
 }

 

  return (
   <div>
     < div className='usersDisplay'>
        {listOfUsers.map((user)=>{
          return <div>
            <h1>Name : {user.name}</h1>
            <h1>Age : {user.age}</h1>
            <h1>User Name : {user.username}</h1>
            <button onClick={updateUser}>Update</button> <br/><br/>
            <button>Delete</button>
          <hr/>

          </div>
        })}
     </div>

     <div >
       <input type="text" placeholder='Name' onChange={(event)=>{
         setName(event.target.value)
       }}/> <br/><br/>
       <input type="number" placeholder='Age'onChange={(event)=>{
         setAge(event.target.value)
       }}/><br/><br/>
       <input type="text" placeholder='UserName'onChange={(event)=>{
         setUsername(event.target.value)
       }}/><br/><br/>
       <button onClick={createUser}>Create User</button>

     </div>

   </div>
  );
}

export default App;
