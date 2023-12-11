import {useState, useEffect} from "react";
import supabase from "./config/supabaseClient";
import { AgGridReact } from 'ag-grid-react';
import AddHappening from "./components/AddHappening";
import { Button } from "@mui/material";
import './App.css'
import AddAssociation from "./components/AddAssociation";
import EditAssociation from "./components/EditAssociation";

export default function Associations () {
  const [columnDefs] = useState([
    {field: 'name',headerName: 'Ryhmän nimi',  sortable: true, filter: true, cellStyle: { whiteSpace: 'normal' } },
    {field: 'description',headerName: 'Kuvaus',  sortable: true, filter: true, cellStyle: { whiteSpace: 'normal' } },
    {cellRenderer: params => (<Button variant='outlined'onClick={() =>
      deleteAssociation(params.data.associationid)}>Poista Ryhmä</Button>
      ),
    },
    {cellRenderer: params => (<EditAssociation associationId={params.data.associationid}
      saveAssociation={saveAssociation} size ='small' />
      ),
    },
    {cellRenderer: params => (<AddHappening associationId={params.data.associationid}
      saveHappening={saveHappening} size ='small' />
      ),
    }
    
  ]);
    const [fetchError, setFetchError] = useState(null);
    const [association, setAssociation] = useState(null);
    useEffect(() => {
        const fetchAssociation = async () =>{
            const {data, error} = await supabase
            .from('association')
            .select()
            if (error){
                setFetchError('Could not fetch association')
                setAssociation(null)
                console.log(error)
            }
            if (data) {
                setAssociation(data)
                setFetchError(null)
            }
        }
        fetchAssociation()
}, []);
const saveAssociation = async (newAssociation) => {
  try {
    if (newAssociation.associationid) {
      // If there is an associationid, it means we are updating an existing association
      const { data, error } = await supabase
        .from('association')
        .update({
          name: newAssociation.name,
          description: newAssociation.description,
        })
        .eq('associationid', newAssociation.associationid);

      if (error) {
        console.error('Error updating association:', error);
        // Handle the error as needed
      } else if (data) {
        console.log('Data after updating:', data);
        // If the update is successful, fetch the updated list of associations
        fetchAssociation();
      }
    } else {
      // If there is no associationid, it means we are adding a new association
      const { data, error } = await supabase
        .from('association')
        .insert([
          {
            name: newAssociation.name,
            description: newAssociation.description,
          },
        ]);

      if (error) {
        console.error('Error saving association:', error);
        // Handle the error as needed
      } else if (data) {
        console.log('Data after saving:', data);
        // If the save is successful, fetch the updated list of associations
        fetchAssociation();
      }
    }
  } catch (error) {
    console.error('Error saving or updating association:', error);
    // Handle the error as needed
  }
};
        
    const saveHappening = async (newHappening) => {
      try {
        const associationId = newHappening.associationid || null;
    console.log('Association ID:', associationId);
        const { data, error } = await supabase
          .from('happening')
          .insert([
            {
              associationid: associationId,
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
        }
    
        if (data) {
          console.log('Data after saving:', data);
          // If the save is successful, fetch the updated list of happenings
          fetchHappening();
        }
      } catch (error) {
        console.error('Error saving happening:', error);
        // Handle the error as needed
      }
    };
    const deleteAssociation = async (associationId) => {
      try {
        const { data, error } = await supabase
          .from('association')
          .delete()
          .eq('associationid', associationId);
    
        if (error) {
          console.error('Error deleting association:', error);
          // Handle the error as needed
        }
    
        if (data) {
          console.log('Data after deleting:', data);
          // If the deletion is successful, fetch the updated list of happenings
          fetchAssociation();
        }
      } catch (error) {
        console.error('Error deleting association:', error);
        // Handle the error as needed
      }
    };
    const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipStyle, setTooltipStyle] = useState({ display: "none" });
    const handleCellMouseOver = (event) => {
      const descriptionColumn = 'description';
      const isOverDescriptionColumn = event.column.colDef.field === descriptionColumn;
    
      if (isOverDescriptionColumn) {
        const description = event.api.getValue(descriptionColumn, event.node);
        setTooltipContent(description);
    
        const cellRect = event.event.target.getBoundingClientRect();
        setTooltipStyle({
          display: 'block',
          position: 'absolute',
          top: `${cellRect.bottom}px`,
          left: `${cellRect.left}px`,
        });
      } else {
        // If not over the 'description' column, hide the tooltip
        setTooltipStyle({ display: 'none' });
      }
    };
  
    const handleCellMouseOut = () => {
      setTooltipStyle({ display: 'none' });
    };

    return (
      <div className="grid-container">
        <AddAssociation saveAssociation={saveAssociation}/>
      <div className="ag-theme-material" style= {{ width: '80%', height: 500}} >
            <AgGridReact
                rowData={association}
                columnDefs={columnDefs}
                pagination={true}
                paginationAutoPageSize={true}
                domLayout='autoWidth'
                onCellMouseOver={handleCellMouseOver}
                onCellMouseOut={handleCellMouseOut}
            />
            <div className="custom-tooltip" style={tooltipStyle}>
        <div className="tooltip-content-box">{tooltipContent}</div>
      </div>
        </div>
        </div>
      )
}
      
