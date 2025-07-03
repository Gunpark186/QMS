import { useState } from 'react';
import {
  Grid, TextField, MenuItem, IconButton, Button, Typography, Box, Paper, Divider, CircularProgress
} from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import axios from 'axios';

const lockTypes = ['VDA', '3rd Party'];
const encoderTypes = ['Auto', 'Nil'];

export default function DoorLockIntegrationForm({ projectId, projectType, onNext }) {
  const [entries, setEntries] = useState([
    { lock_type: '', third_party_type: '', count: '', encoder_type: '', access_card_type: '' }
  ]);
  const [loading, setLoading] = useState(false); // For handling submission loading state

  // Handle field change
  const handleChange = (index, e) => {
    const updated = [...entries];
    updated[index][e.target.name] = e.target.value;
    setEntries(updated);
  };

  // Handle adding a new entry
  const handleAdd = () => {
    setEntries([...entries, { lock_type: '', third_party_type: '', count: '', encoder_type: '', access_card_type: '' }]);
  };

  // Handle removing an entry
  const handleRemove = (index) => {
    const updated = [...entries];
    updated.splice(index, 1);
    setEntries(updated);
  };

  // Validate form fields before submission
  const validateForm = () => {
    return entries.every(entry => 
      entry.lock_type && entry.count && entry.encoder_type && entry.access_card_type
    );
  };

  // Handle form submission
  const handleSubmit = () => {
    // Handle form submission logic (for now just move to next tab)
    alert('Project Info saved!');
    
    // Trigger the onNext function to switch to the next tab
    if (onNext) {
      onNext();  // This will move to the next tab
    }
  };
  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: '1000px', mx: 'auto' }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>Door Lock Integration</Typography>

      {/* Form Entries */}
      {entries.map((entry, index) => (
        <Paper key={index} elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                select
                fullWidth
                label="Lock Type"
                name="lock_type"
                value={entry.lock_type}
                onChange={(e) => handleChange(index, e)}
                variant="outlined"
                required
              >
                {lockTypes.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                fullWidth
                label="3rd Party Type"
                name="third_party_type"
                value={entry.third_party_type}
                onChange={(e) => handleChange(index, e)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                type="number"
                fullWidth
                label="Count"
                name="count"
                value={entry.count}
                onChange={(e) => handleChange(index, e)}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                select
                fullWidth
                label="Encoder Type"
                name="encoder_type"
                value={entry.encoder_type}
                onChange={(e) => handleChange(index, e)}
                variant="outlined"
                required
              >
                {encoderTypes.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                fullWidth
                label="Access Card Type"
                name="access_card_type"
                value={entry.access_card_type}
                onChange={(e) => handleChange(index, e)}
                variant="outlined"
                required
              />
            </Grid>

            {/* Add/Remove Buttons */}
            <Grid item xs={12} sm={12} md={1}>
              <Box display="flex" justifyContent="flex-start" sx={{ gap: 2 }}>
                <IconButton color="primary" onClick={handleAdd}>
                  <AddCircleOutline fontSize="large" />
                </IconButton>
                {index > 0 && (
                  <IconButton color="error" onClick={() => handleRemove(index)}>
                    <RemoveCircleOutline fontSize="large" />
                  </IconButton>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Divider sx={{ my: 3 }} />

      {/* Submit Button */}
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          size="large"
          sx={{ px: 4, py: 1.5 }}
          onClick={handleSubmit}
          disabled={loading}  // Disable button during submission
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Save & Next'}
        </Button>
      </Box>
    </Paper>
  );
}
