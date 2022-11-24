import * as React from 'react';
import { useEffect, useState } from 'react';

// mui imports 
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';

const columns = [
  { id: 'city', label: 'City', minWidth: 170 },
  { id: 'state', label: 'State', minWidth: 100 },
  {
    id: 'latitude',
    label: 'Latitude',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'longitude',
    label: 'Longitude',
    minWidth: 170,
    align: 'right',
  },
];

// 30 city data
const rows = [
  { city: 'Bhopal', state: 'MP', latitude: 23.259933, longitude: 77.412615 },
  { city: 'Indore', state: 'MP', latitude: 22.719569, longitude: 75.857726 },
  { city: 'Kota', state: 'RJ', latitude: 25.213816, longitude: 75.864753 },
  { city: 'Jhansi', state: 'UP', latitude: 25.448426, longitude: 78.568459 },
  { city: 'Jabalpur', state: 'MP', latitude: 23.181467, longitude: 79.986407 },
  { city: 'Sagar', state: 'MP', latitude: 23.838805, longitude: 78.737807 },
  { city: 'Katni', state: 'MP', latitude: 23.834344, longitude: 80.389381 },
  { city: 'Nagpur', state: 'MH', latitude: 21.145800, longitude: 79.088155 },
  { city: 'Guna', state: 'MP', latitude: 24.632365, longitude: 77.300176 },
  { city: 'Betul', state: 'MP', latitude: 21.901160, longitude: 77.896020 },

  { city: 'Delhi', state: 'Delhi', latitude: 28.704059, longitude: 77.102490 },
  { city: 'Gurugram', state: 'Haryana', latitude: 28.459497, longitude: 77.026638 },
  { city: 'Firozabad', state: 'UP', latitude: 27.159196, longitude: 78.395733 },
  { city: 'Mehrauli', state: 'Delhi', latitude: 28.520464, longitude: 77.178666 },
  { city: 'Sarai Rohilla', state: 'Delhi', latitude: 28.667625, longitude: 77.185773 },
  { city: 'Lalitpur', state: 'UP', latitude: 24.691171, longitude: 78.413818 },
  { city: 'Meerut', state: 'UP', latitude: 28.984462, longitude: 77.706414 },
  { city: 'Lucknow', state: 'UP', latitude: 26.846694, longitude: 80.946166 },
  { city: 'Noida', state: 'UP', latitude: 28.535516, longitude: 77.391026 },
  { city: 'Aligarh', state: 'UP', latitude: 27.897394, longitude: 78.088013 },

  { city: 'Jaipur', state: 'Rajasthan', latitude: 26.912434, longitude: 75.787271 },  
  { city: 'Jodhpur', state: 'Rajasthan', latitude: 26.238947 , longitude: 73.024309 },
  { city: 'Ajmer', state: 'Rajasthan', latitude: 26.449895 , longitude: 74.639916 },
  { city: 'Bikaner', state: 'Rajasthan', latitude: 28.022935 , longitude: 73.311916 },
  { city: 'Alwar', state: 'Rajasthan', latitude: 27.552991  , longitude: 76.634574 },
  { city: 'Bharatpur', state: 'Rajasthan', latitude: 27.215186  , longitude: 77.503000 },
  { city: 'Pali', state: 'Rajasthan', latitude: 25.778062  , longitude: 73.331147 },
  { city: 'Udaipur', state: 'Rajasthan', latitude: 24.585445  , longitude: 73.712479 },
  { city: 'Sikar', state: 'Rajasthan', latitude: 27.609391  , longitude: 75.139793 },
  { city: 'Sri Ganganagar', state: 'Rajasthan', latitude: 29.909376 , longitude: 73.879981 },

];


const App = () => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  
  const [wether, setWetherState] = useState([]);
  
  // update weather function
  const updateWetherState = async (page) => {
    console.log(rows);
    
    const url = 'https://tranquil-spire-71733.herokuapp.com/get-wether';
    // const url = 'http://localhost:3000/get-wether';
    const response = await axios({
      method: 'get',
      url: url,
      params: { data: rows, key: page },
    });

    setWetherState(response.data);
  }
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // updating values on page update
    updateWetherState(newPage);
  };

  // not using 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    // getting wether data on page load
    updateWetherState(0)
  }, [])

  return (
    <>
      {/* table component */} 
      
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Map component */}
      
      <MapContainer center={[23.539367, 78.282862]} zoom={5} scrollWheelZoom={true} style={{ width: '100vw', height: '40vh' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {wether && wether.map((val, index) => {
          return (
            <Marker key={index} position={[val.coord.lat, val.coord.lon]}>
              <Popup>
                {val.name}
                <br />
                condition: {val.weather[0].main && val.weather[0].main}
                <div style={{ position: 'relative', bottom: '8px' }}>
                  <strong>{val.weather[0].main && val.weather[0].main}</strong>
                  <img style={{ maxWidth: '20%', background: 'grey', borderRadius: '10px', position: 'relative', top: '10px', left: '10px' }} src={`http://openweathermap.org/img/wn/${val.weather[0].icon && val.weather[0].icon}@2x.png`} alt="icon" />
                </div>
                wind speed: {(val.wind.speed * 3.6).toFixed(2)} Km./Hr.
                <br />
                temprature: {val.main.temp} °F
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </>
  )
}

export default App;