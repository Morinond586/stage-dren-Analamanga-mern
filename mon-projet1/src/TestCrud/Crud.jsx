import { useEffect, useState } from 'react'
import {MdClose, MdEdgesensorLow, MdEdit} from "react-icons/md"
import {MdModeEdit} from "react-icons/md"
import {MdOutlineDeleteForever} from "react-icons/md"
import {MdAddCircleOutline} from "react-icons/md"
// import {MdSend} from "react-icons/md"
import './crud.css'
import axios from "axios"
import FormData from "./FormData"
import Header from '../components/Header'
import ContenuSidebar from '../Contenu/ContenuSidebar'
// import Edit from './Edit'

axios.defaults.baseURL = "http://localhost:8080/"

function Crud() {
    const [addSection,setAddSection]= useState(false) // variable de addSection add
    const [editSection, setEditSection] = useState(false) // variable de addSection edit

    const [formData, setFormData] = useState({ //appel name chaque champ pour faire d'insertion
        name : "",
        email : "",
        mobile : "",
    })

    const [formDataEdit, setFormDataEdit] = useState({  //appel name chaque champ pour faire de modification
        name : "",
        email : "",
        mobile : "",
        _id : ""
    })

    const [dataList, setDataList] = useState ([]) // variable touts les data sur les database

    const handleOnChange = (e) => { 
        const {value,name} = e.target
        setFormData((preve) => {
            return{
                ...preve,
                [name] : value
            }
        })
    }
    const handleSubmit = async(e) => { // valider de button ajout
        e.preventDefault()
        const data = await axios.post("/create", formData)
        console.log(data)
        if(data.data.success){
            setAddSection(false)
            alert(data.data.message)
            getFetchData()
        }
    }

    const getFetchData = async() => { // afficher tous la list via la base de données
        const data = await axios.get("/")
        console.log(data)
        if(data.data.success){
            setDataList(data.data.data)
        }
    }
    useEffect(() => {
        getFetchData()
    },[])

// delete 
    const handleDelete = async(id)=> {
        const data = await axios.delete("/delete/"+id)  
        if(data.data.success){
            getFetchData()
            alert(data.data.message)
        }
    }

    // update 
    const handleUpdate = async(e) => {
        e.preventDefault()
        const data = await axios.put("/update/",formDataEdit)  
        if(data.data.success){
            getFetchData()
            alert(data.data.message)
            setEditSection(false)
        }
    }

    const handleEditOnChange = async(e) => { // affiche le mot de faire mos en jour
        const {value,name} = e.target
        setFormDataEdit((preve) => {
            return{
                ...preve,
                [name] : value
            }
        })
    }
    const handleEdit = (el) => { 
        setFormDataEdit(el)
        setEditSection(true)
    }

  return (
    <div className='container'>
      <Header />
      <ContenuSidebar />
    <div className="main">
    <button className="btn btn-add" onClick={()=>setAddSection(true)}>Ajouter <MdAddCircleOutline/> </button> 
    {/* <button className="btn  btn-send btn-success">Envoyer <MdSend/> </button> */}

    {
      addSection && (
     <FormData 
       handleSubmit={handleSubmit}
       handleOnChange={handleOnChange}
       handleclose= {()=>setAddSection(false)}
       rest={formData}
     />
      )
    }

   {
      editSection && (
        <FormData 
        handleSubmit={handleUpdate}
        handleOnChange={handleEditOnChange}
        handleclose = {()=>setEditSection(false)}
        rest={formDataEdit}
      />
      )
    }
    <div className='tableContainer'>
            <table>
               <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th>Action</th>
                    <th>Selection</th>
                  </tr>
               </thead>
               <tbody>
              {  dataList[0] ? ( 
                dataList.map((el)=>{
                  return(
                    <tr>
                        <td>{el.name}</td>
                        <td>{el.email}</td>
                        <td>{el.mobile}</td>
                        <td>
                             <button className="btn btn-edit btn-primary" onClick={()=>handleEdit(el)}><MdModeEdit/></button>
                             <button className="btn btn-edit btn-danger" onClick={()=>handleDelete(el._id)}><MdOutlineDeleteForever/></button>
                             </td>
                        <td>
                         <input type="checkbox" name="" />
                       </td>
                    </tr>
                  )
                }))
                : (
                    <p style={{textAlign: "center"}}>No data</p>
                )
              }
               </tbody>
            </table>
          </div> 
  </div>
    </div>
  )
}

export default Crud