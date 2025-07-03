import { useState } from 'react';
import {
  Grid, TextField, MenuItem, IconButton, Button,
  Typography, Box, Paper, Divider
} from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

const roomTypes = ['Standard Room', 'King Room', 'Suite Room'];
const zones = ['Living', 'Kitchen', 'Balcony'];
const types = ['Sensor', 'Contact'];
const mounts = ['Wall', 'Door', 'Window'];

const defaultEntry = {
  room_type: '', zone: '', type: '', mount: '', count: '', function_type: ''
};

export default function SensorContactsForm({ projectId, onNext }) {
  const [entries, setEntries] = useState([defaultEntry]);
  const [errors, setErrors] = useState([{}]);

  const handleChange = (index, e) => {
    const updated = [...entries];
    updated[index][e.target.name] = e.target.value;
    setEntries(updated);

    const newErrors = [...errors];
    if (newErrors[index]) {
      newErrors[index][e.target.name] = '';
      setErrors(newErrors);
    }
  };

  const handleAdd = () => {
    setEntries([...entries, { ...defaultEntry }]);
    setErrors([...errors, {}]);
  };

  const handleRemove = (index) => {
    const updatedEntries = [...entries];
    const updatedErrors = [...errors];
    updatedEntries.splice(index, 1);
    updatedErrors.splice(index, 1);
    setEntries(updatedEntries);
    setErrors(updatedErrors);
  };

  const validateForm = () => {
    let valid = true;
    const validationErrors = entries.map((entry) => {
      const err = {};
      if (!entry.room_type) err.room_type = 'Required';
      if (!entry.zone) err.zone = 'Required';
      if (!entry.type) err.type = 'Required';
      if (!entry.mount) err.mount = 'Required';
      if (!entry.count || entry.count <= 0) err.count = 'Enter valid count';
      if (!entry.function_type) err.function_type = 'Required';
      if (Object.keys(err).length > 0) valid = false;
      return err;
    });

    setErrors(validationErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    alert('Sensor & Contact Info saved!');
    if (onNext) onNext();
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: '1000px', mx: 'auto' }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Sensor & Contacts Integration
      </Typography>

      {entries.map((entry, index) => (
        <Paper key={index} elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={2.4}>
              <TextField
                select fullWidth label="Room Type" name="room_type"
                value={entry.room_type} onChange={(e) => handleChange(index, e)}
                error={!!errors[index]?.room_type} helperText={errors[index]?.room_type}
              >
                {roomTypes.map(rt => <MenuItem key={rt} value={rt}>{rt}</MenuItem>)}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={2.4}>
              <TextField
                select fullWidth label="Zone" name="zone"
                value={entry.zone} onChange={(e) => handleChange(index, e)}
                error={!!errors[index]?.zone} helperText={errors[index]?.zone}
              >
                {zones.map(z => <MenuItem key={z} value={z}>{z}</MenuItem>)}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={2.4}>
              <TextField
                select fullWidth label="Type" name="type"
                value={entry.type} onChange={(e) => handleChange(index, e)}
                error={!!errors[index]?.type} helperText={errors[index]?.type}
              >
                {types.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={2.4}>
              <TextField
                select fullWidth label="Mount" name="mount"
                value={entry.mount} onChange={(e) => handleChange(index, e)}
                error={!!errors[index]?.mount} helperText={errors[index]?.mount}
              >
                {mounts.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={2.4}>
              <TextField
                fullWidth type="number" label="Count" name="count"
                value={entry.count} onChange={(e) => handleChange(index, e)}
                error={!!errors[index]?.count} helperText={errors[index]?.count}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth label="Function Type" name="function_type"
                value={entry.function_type} onChange={(e) => handleChange(index, e)}
                error={!!errors[index]?.function_type}
                helperText={errors[index]?.function_type}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={1.5}>
              <Box display="flex" alignItems="center" gap={1}>
                <IconButton color="primary" onClick={handleAdd}>
                  <AddCircleOutline />
                </IconButton>
                {index > 0 && (
                  <IconButton color="error" onClick={() => handleRemove(index)}>
                    <RemoveCircleOutline />
                  </IconButton>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Divider sx={{ my: 3 }} />

      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          sx={{ px: 4, py: 1.5 }}
        >
          Save & Next
        </Button>
      </Box>
    </Paper>
  );
}
