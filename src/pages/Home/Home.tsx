import React, { useState } from 'react';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { People } from '@/data/people.ts';
import { Person } from '@/models';
import { Checkbox } from '@mui/material';
import { useDispatch } from 'react-redux';

const Home: React.FC = () => {
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
  const pageSize = 5;
  const dispatch = useDispatch();

  const findPerson = (person: Person) => !!selectedPeople.find((p) => p.id === person.id);
  const filterPerson = (person: Person) => selectedPeople.filter((p) => p.id !== person.id);

  const onHandleChange = (person: Person)  => {
    const filteredPeople = setSelectedPeople(findPerson(person) ? filterPerson(person) : [...selectedPeople, person] )
    dispatch(addFavorite(filteredPeople))
  }

  const columns=[
    {
      field: 'actions',
      headerName: '',
      type: 'actions',
      sortable: false,
      width: 35,
      renderCell: (params: GridRenderCellParams) => <>{
        <Checkbox
          size="small"
          checked={findPerson(params.row)}
          onChange={() => onHandleChange(params.row)}
        />
      }</>
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    },
    {
      field: 'company',
      headerName: 'Company',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    }
  ]

  return (
    <>
      <DataGrid
        rows={People}
        columns={columns}
        disableColumnSelector
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5
            },
          },
        }}
        autoHeight
        paginationMode="client"
        pageSizeOptions={[pageSize]}
        getRowId={(row: any) => row.id}
        disableRowSelectionOnClick
      />
    </>
  );
};

export default Home;
