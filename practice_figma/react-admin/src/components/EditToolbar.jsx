import React from 'react';
import { Box, Button } from '@mui/material';
import { GridCellModes } from '@mui/x-data-grid';

const EditToolbar = (props) => {
  const { selectedCellParams, cellMode, cellModesModel, setCellModesModel } = props;

  const handleSaveOrEdit = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;
    if (cellMode === 'edit') {
      setCellModesModel({
        ...cellModesModel,
        [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.View } },
      });
    } else {
      setCellModesModel({
        ...cellModesModel,
        [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.Edit } },
      });
    }
  };

  const handleCancel = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;
    setCellModesModel({
      ...cellModesModel,
      [id]: {
        ...cellModesModel[id],
        [field]: { mode: GridCellModes.View, ignoreModifications: true },
      },
    });
  };

  const handleMouseDown = (event) => {
    // Keep the focus in the cell
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        p: 1,
        display: 'flex',
        gap: 2, // Add gap between buttons
      }}
    >
      {cellMode === 'view' && (
        <>
          <Button
            onClick={handleSaveOrEdit}
            onMouseDown={handleMouseDown}
            disabled={!selectedCellParams}
            variant="contained"
            color="secondary"
          >
            Edit
          </Button>
          <Button
            onClick={handleCancel}
            onMouseDown={handleMouseDown}
            disabled={!selectedCellParams}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
        </>
      )}
      {cellMode === 'edit' && (
        <>
          <Button
            onClick={handleSaveOrEdit}
            onMouseDown={handleMouseDown}
            disabled={!selectedCellParams}
            variant="contained"
            color="secondary"
          >
            Save
          </Button>
          <Button
            onClick={handleCancel}
            onMouseDown={handleMouseDown}
            disabled={!selectedCellParams}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
        </>
      )}
    </Box>
  );
};

export default EditToolbar;
