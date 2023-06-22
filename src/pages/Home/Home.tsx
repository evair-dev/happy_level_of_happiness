import React, { useEffect } from 'react';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { People } from '@/data/people.ts';
import { Person } from '@/models';
import { Checkbox } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorites, addPeople, removeFavorites } from '@/redux/states';
import { AppStore } from '@/redux/store.ts';

const Home: React.FC = () => {
  const pageSize = 5;
  const dispatch = useDispatch();
  const statePeople = useSelector((store: AppStore) => store.people);
  const favoritePeople = useSelector((store: AppStore) => store.favorites);

  const findPerson = (person: Person) => !!favoritePeople.find(p => p.id === person.id);

  const handleChange = (person: Person) => {
    if (findPerson(person)) {
      dispatch(removeFavorites(person))
      return;
    }
    dispatch(addFavorites(person));
  };

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
          onChange={() => handleChange(params.row)}
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

  useEffect(() => {
      dispatch(addPeople(People))
    }
    , []
  );

  return (
    <>
      <DataGrid
        rows={statePeople}
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
        getRowId={(row: Person) => row.id}
        disableRowSelectionOnClick
      />
    </>
  );
};

export default Home;
