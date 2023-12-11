import { useEffect, useState } from "react";
import supabase from "./config/supabaseClient";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Button } from "@mui/material";
import EditHappening from "./components/EditHappening";

export default function Happenings() {
  const [columnDefs] = useState([
    { field: 'name', headerName: 'Joukkue', sortable: true, filter: true},
    { field: 'date', headerName: 'Päivä', sortable: true, filter: true},
    { field: 'time', headerName: 'Kellonaika', sortable: true, filter: true},
    { field: 'streetaddress', headerName: 'Kauosoite', sortable: true, filter: true },
    { field: 'postcode', headerName: 'Postikoodi', sortable: true, filter: true},
    { field: 'city', headerName: 'Kaupunki', sortable: true, filter: true, },
    { field: 'maxparticipants', headerName: 'Osallistujamäärä', sortable: true, filter: true,},
    { field: 'price', headerName: 'Hinta', sortable: true, filter: true},
    {
      cellRenderer: params => (
        <Button variant='outlined'onClick={() => deleteHappening(params.data.happeningid)}>Poista tapahtuma</Button>
        ),
    },
    {
      cellRenderer: params => (
        <EditHappening happeningid={params.data.happeningid} saveHappening={saveHappening} />

        ),
    }
  ]);
  const [fetchError, setFetchError] = useState(null);
  const [happening, setHappening] = useState(null);

  
  const fetchHappening = async () => {
    try {
      const { data, error } = await supabase
        .from('happening')
        .select(
          `
          *,
          association:associationid(name)
          `
        );
      console.log('Data:', data);
      console.log('Error:', error);
      if (error) {
        setFetchError('Could not fetch happenings');
        setHappening(null);
        console.log(error);
      }
      if (data) {
        const joinedData = data.map((item) => ({
          ...item,
          name: item.association ? item.association.name : null,
        }));
        setHappening(joinedData);
        setFetchError(null);
      }
    } catch (error) {
      console.error('Error fetching happenings:', error);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchHappening();
  }, []); // The empty dependency array ensures that this effect runs only once
  const deleteHappening = async (happeningId) => {
    try {
      console.log('Deleting happening with ID:', happeningId);
      const { data, error } = await supabase
        .from('happening')
        .delete()
        .eq('happeningid', happeningId);
  
      if (error) {
        console.error('Error deleting happening:', error);
        // Handle the error as needed
      }
  
      if (data) {
        console.log('Data after deleting:', data);
        // If the deletion is successful, fetch the updated list of happenings
        fetchHappening();
      }
    } catch (error) {
      console.error('Error deleting happening:', error);
      // Handle the error as needed
    }
  };
  const saveHappening = async (newHappening) => {
    try {
      if (newHappening.happeningid) {
        // If there is a happeningid, it means we are updating an existing happening
        const { data, error } = await supabase
          .from('happening')
          .update({
            date: newHappening.date,
            time: newHappening.time,
            streetaddress: newHappening.streetaddress,
            postcode: newHappening.postcode,
            city: newHappening.city,
            maxparticipants: newHappening.maxparticipants,
            price: newHappening.price,
          })
          .eq('happeningid', newHappening.happeningid);
  
        if (error) {
          console.error('Error updating happening:', error);
          // Handle the error as needed
        } else if (data) {
          console.log('Data after updating:', data);
          // If the update is successful, fetch the updated list of happenings
          fetchHappening();
        }
      } else {
        // If there is no happeningid, it means we are adding a new happening
        const { data, error } = await supabase
          .from('happening')
          .insert([
            {
              date: newHappening.date,
              time: newHappening.time,
              streetaddress: newHappening.streetaddress,
              postcode: newHappening.postcode,
              city: newHappening.city,
              maxparticipants: newHappening.maxparticipants,
              price: newHappening.price,
            },
          ]);
  
        if (error) {
          console.error('Error saving happening:', error);
          // Handle the error as needed
        } else if (data) {
          console.log('Data after saving:', data);
          // If the save is successful, fetch the updated list of happenings
          fetchHappening();
        }
      }
    } catch (error) {
      console.error('Error saving or updating happening:', error);
      // Handle the error as needed
    }
  };
  return (
    <div className="grid-container">
    <div className="ag-theme-material" style={{ width: '80%', height: 500}}>
      <AgGridReact
        rowData={happening}
        columnDefs={columnDefs}
        pagination={true}
        paginationAutoPageSize={true}
        domLayout="autoWidth"
      />
    </div>
    </div>
  );
  }
