import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './card.css'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Select from "react-select"
import axios from 'axios';
import {Button} from "react-bootstrap"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Chart, Pie } from 'react-chartjs-2';

import { useState,useEffect } from 'react'


function CardPage(){
    

  
ChartJS.register(ArcElement,
  Tooltip,
  Legend );

  
    const [item, setItem]=useState([]);
    const [search,setSearch]=useState('')
    const[dropDownData,setDropDownData]=useState([])
    const [selectedCategory,setSelectedCategory]=useState({label:'',value:''})

 

  
useEffect(()=>{
  fakeStore()
},[selectedCategory])

    useEffect(()=>{
        fakeProductData()
    },[])

    const fakeStore=async()=>{
      let url=`https://fakestoreapi.com/products`
      if(selectedCategory.value!==""){
        url=`https://fakestoreapi.com/products/category/${selectedCategory.value}`
      }
        const response=await fetch(url);
        console.log("response",response)
        const jsonData=await response.json();
        setItem(jsonData)
    }


    const fakeProductData =()=>{
      axios.get("https://fakestoreapi.com/products/categories")
      .then((resp)=>{
        let data=resp.data.map(item=>({label:item,value:item}))
setDropDownData(data)
      })
      .catch(err=>{
        console.log(err)
      })
    }


 function selectChangeHandler (data){
setSelectedCategory(data)
 }
 


console.log(selectedCategory)




let res=[]
let mens=0
let elec=0
let jewl=0
let women=0
let a=0;






(function random(){
  item.map((data)=>{
    
    if(data.category==="men's clothing"){
      mens++
     
    } else if(data.category ==="jewelery"){
      jewl++ 
    } else if(data.category==='electronics'){
      elec++
    } else if(data.category==="women's clothing"){
      women++
    }
   
  })
  res.push(mens)
  res.push(jewl)
  res.push(elec)
  res.push(women)
 
}());
 
console.log(res)


const data={
  
  labels: ["Men's Clothing", "Jewelery", "Electronics", "Women's Clothing"],
  datasets: [
    {
      label: 'Number of items',
      data:res,
      backgroundColor:[ 'aqua','orangered','purple','grey']
    }
  ],
  
};


function show(){ 
  document.getElementsByClassName("pie")[0].style.display="block"
}

function hide(){
  document.getElementsByClassName("pie")[0].style.display="none"
}


    return ( <>
 



<div className='top'>

{['sm'].map((expand) => (
        <Navbar key={expand} bg="primary" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="#">{JSON.parse(localStorage.getItem("userdetails")).userName} &nbsp; {JSON.parse(localStorage.getItem("userdetails")).email}</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                 <Select 
     className='react-select-custom'
                 value={selectedCategory}
                 options={dropDownData}
                 onChange={selectChangeHandler}
          
                 />
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    onChange={(e)=>setSearch(e.target.value)}  
                    placeholder="Search"
                    id='searchbar'
                    className="me-2"
                    aria-label="Search"
                  />
                  
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}



    <h1>
        Welcome to our store
    </h1>
    <div className='main'>
    <div className="container text-center">
            <div className="row">
    {item.filter((data)=>{
      return search.toLocaleLowerCase() === '' ? data : data.title.toLocaleLowerCase().includes(search)
    }).map((values)=>{
        let val=values.description
        if(val.length>150){
            var length = 150;
            var trimmedString = val.substring(0, length)+"..."
        }
        else{
            trimmedString=val
        }
                return(
                    <>           
             <div className="col-3 lg-3 md-5 sm-12 mt-5">
             <div class="card text-white bg-secondary mb-3" >
                 <img id='imagesize' src={values.image} className="card-img-top" alt="..." height="200px" />
                 <div class="card-body">
                 <h5 class="card-title" id='titlesize'>{values.title}</h5>
                 <p class="card-text" id='textsize'>{trimmedString}</p>
               </div>
                 </div>
              </div>
             </>  )
})}


</div>
</div>
</div>




<Button className='floating' onClick={show}  variant="danger">Analyse</Button>



<div className='pie'>
<Button className='float' onClick={hide}  variant="success">hide</Button>
  <Pie data={data}/>
      
 </div>
 </div>
   
    </>)

}
export default CardPage