
import { useEffect, useState } from "react";
import supabase from "./config/supabaseClient";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Button } from "@mui/material";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";

export default function Users () {
  const [columnDefs] = useState([
    {field: 'firstname',headerName: 'Etunimi',  sortable: true, filter: true },
    {field: 'lastname', headerName: 'Sukunimi', sortable: true, filter: true },
    {field: 'email', headerName: 'Sähköposti',  sortable: true, filter: true, width:230 },
    {cellRenderer: params => (<Button variant='outlined'onClick={() =>
      deleteUser(params.data.personid)}>Poista käyttäjä</Button>
      ),
    },
    {cellRenderer: params => (<EditUser personId={params.data.personid}
      saveUser={saveUser} size ='small' />
      )
    }
  ]);
    const [fetchError, setFetchError] = useState(null);
    const [person, setPerson] = useState(null);
    useEffect(() => {
        const fetchPerson = async () =>{
            const {data, error} = await supabase
            .from('person')
            .select()
            if (error){
                setFetchError('Could not fetch happenings')
                setPerson(null)
                console.log(error)
            }
            if (data) {
                setPerson(data)
                setFetchError(null)
            }
        }
        fetchPerson()
    }, []);
    const saveUser = async (newPerson) => {
      try {
        if (newPerson.personid) {
          // If there is an associationid, it means we are updating an existing association
          const { data, error } = await supabase
            .from('person')
            .update({
              firstname: newPerson.firstname,
              lastname: newPerson.lastname,
              email: newPerson.email
            })
            .eq('personid', newPerson.personid);
    
          if (error) {
            console.error('Error updating person:', error);
            // Handle the error as needed
          } else if (data) {
            console.log('Data after updating:', data);
            // If the update is successful, fetch the updated list of associations
            fetchPerson();
          }
        } else {
          // If there is no associationid, it means we are adding a new association
          const { data, error } = await supabase
            .from('person')
            .insert([
              {
                firstname: newPerson.firstname,
                lastname: newPerson.lastname,
                email: newPerson.email
              },
            ]);
    
          if (error) {
            console.error('Error saving person:', error);
            // Handle the error as needed
          } else if (data) {
            console.log('Data after saving:', data);
            // If the save is successful, fetch the updated list of associations
            fetchPerson();
          }
        }
      } catch (error) {
        console.error('Error saving or updating association:', error);
        // Handle the error as needed
      }
    };
    const deleteUser = async (personId) => {
      try {
        const { data, error } = await supabase
          .from('person')
          .delete()
          .eq('personid', personId);
    
        if (error) {
          console.error('Error deleting person:', error);
          // Handle the error as needed
        }
    
        if (data) {
          console.log('Data after deleting:', data);
          // If the deletion is successful, fetch the updated list of happenings
          fetchPerson();
        }
      } catch (error) {
        console.error('Error deleting association:', error);
        // Handle the error as needed
      }
    };


    return (
      <div className="grid-container">
        <AddUser saveUser={saveUser}/>
      
      <div className="ag-theme-material" style={{ width: '80%', height: 500 }} >
            <AgGridReact
                rowData={person}
                columnDefs={columnDefs}
                pagination={true}
                paginationAutoPageSize={true}
                domLayout="autoWidth"
            />
        </div>
        </div>
      )}
   
  