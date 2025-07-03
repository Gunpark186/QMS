import { useState } from 'react';
import {
  Grid, TextField, MenuItem, IconButton, Button, Typography, Box, Paper, Divider
} from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline, UploadFile } from '@mui/icons-material';

const roomTypes = ['Standard Room', 'King Room', 'Suite Room'];
const zones = ['Living', 'Kitchen', 'Balcony'];
const hvacTypes = ['FCU', 'VRF'];
const fanSpeeds = ['2 Fan Speed', '3 Fan Speed'];
const controlTypes = ['On/Off', 'Dimming DALI', 'Dimming CV'];

export default function HVACConfigForm({ projectId, onNext }) {
  const [entries, setEntries] = useState([
    { room_type: '', zone: '', hvac_type: '', fan_speed: '', control_type: '' }
  ]);
  const [diagram, setDiagram] = useState(null);
  const [errors, setErrors] = useState([]);

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
    setEntries([...entries, { room_type: '', zone: '', hvac_type: '', fan_speed: '', control_type: '' }]);
    setErrors([...errors, {}]);
  };

  const handleRemove = (index) => {
    const updated = [...entries];
    const updatedErrors = [...errors];
    updated.splice(index, 1);
    updatedErrors.splice(index, 1);
    setEntries(updated);
    setErrors(updatedErrors);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = [];

    entries.forEach((entry, i) => {
      const entryErrors = {};
      if (!entry.room_type) {
        entryErrors.room_type = 'Required';
        isValid = false;
      }
      if (!entry.zone) {
        entryErrors.zone = 'Required';
        isValid = false;
      }
      if (!entry.hvac_type) {
        entryErrors.hvac_type = 'Required';
        isValid = false;
      }
      if (!entry.fan_speed) {
        entryErrors.fan_speed = 'Required';
        isValid = false;
      }
      if (!entry.control_type) {
        entryErrors.control_type = 'Required';
        isValid = false;
      }
      newErrors.push(entryErrors);
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    alert('HVAC configuration saved!');

    if (onNext) onNext();
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: '1000px', mx: 'auto' }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>HVAC Configuration</Typography>

      {/* Upload Diagram */}
      <Box
        sx={{
          border: '2px dashed #ccc',
          borderRadius: 2,
          p: 3,
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          cursor: 'pointer',
          '&:hover': { borderColor: 'primary.main' }
        }}
        component="label"
      >
        <UploadFile fontSize="large" color="primary" />
        <Box>
          <Typography variant="subtitle1">Click to upload HVAC Diagram</Typography>
          <Typography variant="body2" color="text.secondary">
            {diagram ? diagram.name : 'JPG, PNG or PDF accepted'}
          </Typography>
        </Box>
        <input type="file" hidden onChange={(e) => setDiagram(e.target.files[0])} />
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Form Entries */}
      {entries.map((entry, index) => (
        <Paper key={index} elevation={1} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                select fullWidth variant="outlined"
                label="Room Type" name="room_type"
                value={entry.room_type} onChange={(e) => handleChange(index, e)}
                error={!!errors[index]?.room_type}
                helperText={errors[index]?.room_type}
              >
                {roomTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                select fullWidth variant="outlined"
                label="Zone" name="zone"
                value={entry.zone} onChange={(e) => handleChange(index, e)}
                error={!!errors[index]?.zone}
                helperText={errors[index]?.zone}
              >
                {zones.map((zone) => (
                  <MenuItem key={zone} value={zone}>{zone}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                select fullWidth variant="outlined"
                label="HVAC Type" name="hvac_type"
                value={entry.hvac_type} onChange={(e) => handleChange(index, e)}
                error={!!errors[index]?.hvac_type}
                helperText={errors[index]?.hvac_type}
              >
                {hvacTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                select fullWidth variant="outlined"
                label="Fan Speed" name="fan_speed"
                value={entry.fan_speed} onChange={(e) => handleChange(index, e)}
                error={!!errors[index]?.fan_speed}
                helperText={errors[index]?.fan_speed}
              >
                {fanSpeeds.map((speed) => (
                  <MenuItem key={speed} value={speed}>{speed}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                select fullWidth variant="outlined"
                label="Control Type" name="control_type"
                value={entry.control_type} onChange={(e) => handleChange(index, e)}
                error={!!errors[index]?.control_type}
                helperText={errors[index]?.control_type}
              >
                {controlTypes.map((control) => (
                  <MenuItem key={control} value={control}>{control}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={1}>
              <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ gap: 1 }}>
                <IconButton color="primary" onClick={handleAdd}><AddCircleOutline /></IconButton>
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

      {/* Submit Button */}
      <Box mt={4} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          size="large"
          sx={{ px: 4, py: 1.5 }}
          onClick={handleSubmit}
        >
          Save & Next
        </Button>
      </Box>
    </Paper>
  );
}
