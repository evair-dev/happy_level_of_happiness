import { Person } from '@/models';
import { removeFavorites } from '@/redux/states';
import { AppStore } from '@/redux/store';
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


const FavoriteTable: React.FC = () => {
  const pageSize = 5;
  const dispatch = useDispatch();
  const stateFavorites = useSelector((store: AppStore) => store.favorites);

  const handleClick = (person: Person) => {
    dispatch(removeFavorites(person));
  };

  const columns = [
    {
      field: 'actions',
      type: 'actions',
      sortable: false,
      headerName: '',
      width: 50,
      renderCell: (params: GridRenderCellParams) => (
        <>
          {
            <IconButton color="secondary" aria-label="favorites" component="label" onClick={() => handleClick(params.row)}>
              <Delete />
            </IconButton>
          }
        </>
      )
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
      headerName: 'Categories',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    },
    {
      field: 'company',
      headerName: 'Company',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    },
    {
      field: 'levelOfHappiness',
      headerName: 'Level of happiness',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    }
  ];
  return (
    <DataGrid
      rows={stateFavorites}
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
  );
};

export default FavoriteTable;
