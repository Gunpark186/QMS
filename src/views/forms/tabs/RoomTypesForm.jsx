import { useState, useEffect } from 'react';
import {
  Grid, TextField, Button, IconButton, MenuItem, Typography, Box, Paper, Tabs, Tab
} from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';

const roomTypeOptions = [
  'Entrance Corridor',
  'Living Room',
  'Powder Room',
  'Bedroom',
  'Bedroom Bathroom',
  'Balcony'
];

export default function RoomTypesForm({ projectId, onNext, onComplete, initialValues }) {
  const [tab, setTab] = useState(0);
  const [selectedRooms, setSelectedRooms] = useState(initialValues?.selectedRooms || []);
  const [roomInfo, setRoomInfo] = useState(initialValues?.roomInfo || {});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setSelectedRooms(initialValues.selectedRooms || []);
      setRoomInfo(initialValues.roomInfo || {});
    }
  }, [initialValues]);

  const handleTabChange = (_, newValue) => setTab(newValue);

  const handleAddRoomType = () => {
    const available = roomTypeOptions.find(rt => !selectedRooms.includes(rt));
    if (available) setSelectedRooms([...selectedRooms, available]);
  };

  const handleRemoveRoomType = (index) => {
    const removed = selectedRooms[index];
    setSelectedRooms(selectedRooms.filter((_, i) => i !== index));
    setRoomInfo(prev => {
      const newInfo = { ...prev };
      delete newInfo[removed];
      return newInfo;
    });
  };

  const handleRoomTypeChange = (index, value) => {
    if (selectedRooms.includes(value)) return;
    const newRooms = [...selectedRooms];
    const oldRoom = newRooms[index];
    newRooms[index] = value;
    setRoomInfo(prev => {
      const newInfo = { ...prev };
      if (prev[oldRoom]) {
        newInfo[value] = prev[oldRoom];
        delete newInfo[oldRoom];
      }
      return newInfo;
    });
    setSelectedRooms(newRooms);
  };

  const handleQuantityChange = (room, value) => {
    setRoomInfo(prev => ({ ...prev, [room]: value }));
    setErrors(prev => ({ ...prev, [room]: '' }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = {};
    selectedRooms.forEach(room => {
      if (!roomInfo[room] || isNaN(roomInfo[room]) || Number(roomInfo[room]) <= 0) {
        newErrors[room] = 'Enter a valid quantity';
        valid = false;
      }
    });
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (tab === 1 && validate()) {
      alert('Room types saved!');
      if (onNext) onNext();
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 4, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h5" mb={3}>Room Types</Typography>
      <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Number of Room Types" />
        <Tab label="Room Information" />
      </Tabs>
      {tab === 0 && (
        <>
          {selectedRooms.map((room, idx) => (
            <Grid container spacing={2} alignItems="center" key={idx} mb={1}>
              <Grid item xs={10} sm={6} md={5}>
                <TextField
                  select
                  label="Room Type"
                  value={room}
                  onChange={e => handleRoomTypeChange(idx, e.target.value)}
                  fullWidth
                >
                  {roomTypeOptions
                    .filter(rt => rt === room || !selectedRooms.includes(rt))
                    .map(rt => (
                      <MenuItem key={rt} value={rt}>{rt}</MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid item xs={2}>
                {selectedRooms.length > 1 && (
                  <IconButton color="error" onClick={() => handleRemoveRoomType(idx)}>
                    <RemoveCircle fontSize="large" />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}
          <Box mt={2}>
            {selectedRooms.length < roomTypeOptions.length && (
              <Button
                startIcon={<AddCircle />}
                variant="outlined"
                onClick={handleAddRoomType}
              >
                Add Room Type
              </Button>
            )}
          </Box>
        </>
      )}
      {tab === 1 && (
        <>
          {selectedRooms.length === 0 && (
            <Typography color="text.secondary" mb={2}>
              Please add at least one room type in the previous tab.
            </Typography>
          )}
          {selectedRooms.map((room, idx) => (
            <Grid container spacing={2} alignItems="center" key={room} mb={1}>
              <Grid item xs={6} md={5}>
                <Typography>{room}</Typography>
              </Grid>
              <Grid item xs={6} md={5}>
                <TextField
                  label="Quantity"
                  type="number"
                  value={roomInfo[room] || ''}
                  onChange={e => handleQuantityChange(room, e.target.value)}
                  error={Boolean(errors[room])}
                  helperText={errors[room]}
                  fullWidth
                />
              </Grid>
            </Grid>
          ))}
        </>
      )}
      <Box mt={3} textAlign="right">
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          sx={{ px: 4, py: 1.5 }}
          disabled={tab !== 1}
        >
          Save & Next
        </Button>
      </Box>
    </Paper>
  );
}
