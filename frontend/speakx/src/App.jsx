import logo from './logo.svg';
import './App.css';
import { MdOutlineSearch } from "react-icons/md";
import {useState} from 'react';
import axios from 'axios';


import Data from './Data.json';


function App() {
  const [data,setData]=useState([]);
  const [query,setQuery]=useState("");

  const [loading,setLoading]=useState(false);

  const [currentPage,setCurrentPage] =useState(1);
  const recperpage=30;
  const lastIndex=recperpage*currentPage;
  const firstIndex=lastIndex-recperpage;

  const records=data.slice(firstIndex,lastIndex);
  const npage=Math.ceil(data.length/recperpage);
  const number=[...Array(npage+1).keys()].slice(1);

    
  const fetchData=async(event)=>{
    event.preventDefault();
      try{
        setLoading(true)
        const response= await axios.post("http://127.0.0.1:3001/questions", {query});
        setData(response.data.data);
        console.log(response.data.data);
      }
      catch(err){
        console.log(err);
      }
      setLoading(false);
  }

  function changePage(n){
    setCurrentPage(n);
  }
  function prevPage(){
    if(currentPage!==1){
      setCurrentPage(currentPage-1)
    }
  }
  function nextPage(){
    if(currentPage!==npage){
      setCurrentPage(currentPage+1)
    }
  }

  return (
    <div className="App">
      <h2>SpeakX Assignment</h2>
        <form action="" className='search'>
          <input type="search" name="" id="" placeholder='Search here' onChange={(event)=>setQuery(event.target.value)} value={query} />
          <button type='submit' className='icon' onClick={fetchData}><MdOutlineSearch/></button>
        </form>
      <div className="output">
        {
          loading ? <p>Loading....</p>:
        <table>
          <thead>
            <th>Title</th>
            <th>Type</th>
          </thead>
          <tbody>
            {records.map((d,i)=>(
              <tr key={i}>
                <td>{d.type}</td>
                <td>{d.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
        }

        <nav>
          <ul>
            <li>
              <a href="#" onClick={prevPage}>Prev</a>
            </li>
            {
              number.map((n,i)=>(
                <li key={i}>
                  <a href="#" onClick={()=>changePage(n)}>{n}</a>
                </li>
              ))
            }
            <li>
              <a href="#" onClick={nextPage}>Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default App;
