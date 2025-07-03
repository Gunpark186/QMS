import { useState } from 'react';
import {
  Grid, TextField, MenuItem, Button, Typography, Box, Paper, Divider, CircularProgress
} from '@mui/material';
import axios from 'axios';

const integrationTypes = ['Type 1', 'Type 2'];
const yesNo = ['Yes', 'No'];

export default function FinalIntegrationForm({ projectId, projectType }) {
  const [form, setForm] = useState({
    integration_type: '',
    option: '',
    fcu_count: '',
    fcu_split: '',
    points: '',
    api_integration: '',
    hot_sos: ''
  });

  const [loading, setLoading] = useState(false); // Handle loading state

  // Handle field change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validate form
  const validateForm = () => {
    return form.integration_type && form.option && form.fcu_count && form.fcu_split && form.points && form.api_integration && form.hot_sos;
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
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2, maxWidth: '900px', mx: 'auto' }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>Final Integration</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            fullWidth
            label="Integration Type"
            name="integration_type"
            value={form.integration_type}
            onChange={handleChange}
            variant="outlined"
            required
          >
            {integrationTypes.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            fullWidth
            label="Option"
            name="option"
            value={form.option}
            onChange={handleChange}
            variant="outlined"
            required
          >
            {yesNo.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            type="number"
            fullWidth
            label="FCU Count"
            name="fcu_count"
            value={form.fcu_count}
            onChange={handleChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            type="number"
            fullWidth
            label="FCU Split"
            name="fcu_split"
            value={form.fcu_split}
            onChange={handleChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            type="number"
            fullWidth
            label="Points"
            name="points"
            value={form.points}
            onChange={handleChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            fullWidth
            label="API Integration"
            name="api_integration"
            value={form.api_integration}
            onChange={handleChange}
            variant="outlined"
            required
          >
            {yesNo.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            fullWidth
            label="Hot SOS"
            name="hot_sos"
            value={form.hot_sos}
            onChange={handleChange}
            variant="outlined"
            required
          >
            {yesNo.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
          </TextField>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          size="large"
          sx={{ px: 4, py: 1.5 }}
          onClick={handleSubmit}
          disabled={loading}  // Disable button during submission
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Integration'}
        </Button>
      </Box>
    </Paper>
  );
}
