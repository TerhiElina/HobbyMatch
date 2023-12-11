import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import supabase from '../config/supabaseClient';


const HappeningByAssociation = () => {
  const { associationid } = useParams();
  const [associationData, setAssociationData] = useState({});
  const [happeningData, setHappeningData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columnDefs = [
    { field: 'date', headerName: 'Päivä', sortable: true, filter: true },
    { field: 'time', headerName: 'Kellonaika', sortable: true, filter: true },
    { field: 'streetaddress', headerName: 'Kauosoite', sortable: true, filter: true },
    { field: 'postcode', headerName: 'Postikoodi', sortable: true, filter: true },
    { field: 'city', headerName: 'Kaupunki', sortable: true, filter: true },
    { field: 'maxparticipants', headerName: 'Osallistujamäärä', sortable: true, filter: true },
    { field: 'price', headerName: 'Hinta', sortable: true, filter: true },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch association data
        const { data: associationsData, error: associationsError } = await supabase
          .from('association')
          .select('associationid, name, description')
          .eq('associationid', associationid)
          .single();

        if (associationsError) {
          throw associationsError;
        }

        setAssociationData(associationsData);

        // Fetch happening data related to the association
        const { data: happeningsData, error: happeningsError } = await supabase
          .from('happening')
          .select('*')
          .eq('associationid', associationid);

        if (happeningsError) {
          throw happeningsError;
        }

        setHappeningData(happeningsData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [associationid]);

  return (
    <div>
      <h2>{associationData.name}</h2>
      <p>{associationData.description}</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="ag-theme-material" style={{ width: '80%', height: 500 }}>
          <AgGridReact
            rowData={happeningData}
            columnDefs={columnDefs}
            pagination={true}
            paginationAutoPageSize={true}
          />
        </div>
      )}
    </div>
  );
};

export default HappeningByAssociation;