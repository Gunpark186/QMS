import React, { useState } from 'react';
import { Grid, TextField, Button, MenuItem, IconButton, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const roomTypeOptions = [
  'Entrance Corridor',
  'Living Room',
  'Powder Room',
  'Bedroom',
  'Bedroom Bathroom',
  'Balcony'
];
const controlTypeOptions = [
  'Manual',
  'Remote',
  'Smart Switch',
  'Voice',
  'App'
];

export default function CurtainSelectionForm({ onNext, onComplete, initialValues }) {
  const [rows, setRows] = useState(
    initialValues?.curtains?.length > 0
      ? initialValues.curtains
      : [{ roomType: '', qty: '', controlType: '' }]
  );

  const handleChange = (idx, field, value) => {
    setRows((prev) => {
      const updated = [...prev];
      updated[idx][field] = value;
      return updated;
    });
  };

  const handleAddRow = () => {
    setRows((prev) => [...prev, { roomType: '', qty: '', controlType: '' }]);
  };

  const handleSubmit = () => {
    if (onComplete) onComplete({ curtains: rows });
    if (onNext) onNext();
  };

  return (
    <Box>
      <Typography variant="h6" mb={2} fontWeight={600}>Curtain Selection</Typography>
      <Grid container spacing={2} alignItems="center">
        {rows.map((row, idx) => (
          <React.Fragment key={idx}>
            <Grid item xs={4}>
              <TextField
                select
                label="Room Type"
                value={row.roomType}
                onChange={e => handleChange(idx, 'roomType', e.target.value)}
                fullWidth
              >
                {roomTypeOptions.map(opt => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Quantity"
                type="number"
                value={row.qty}
                onChange={e => handleChange(idx, 'qty', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                label="Control Type"
                value={row.controlType}
                onChange={e => handleChange(idx, 'controlType', e.target.value)}
                fullWidth
              >
                {controlTypeOptions.map(opt => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>
            </Grid>
            {idx === rows.length - 1 && (
              <Grid item xs={1}>
                <IconButton color="primary" onClick={handleAddRow} sx={{ mt: 1 }}>
                  <AddIcon />
                </IconButton>
              </Grid>
            )}
          </React.Fragment>
        ))}
        <Grid item xs={12} mt={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ float: 'right' }}>
            Save & Next
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
