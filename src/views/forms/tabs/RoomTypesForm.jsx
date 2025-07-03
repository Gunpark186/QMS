import { useState, useEffect } from 'react';
import {
  Grid, TextField, Button, IconButton, MenuItem, Typography, Box, Paper
} from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';

const roomTypeOptions = [
  'King',
  'Queen',
  'Twin',
  'Suite',
  'Single',
  'Double',
  'Entrance Corridor',
  'Living Room',
  'Powder Room',
  'Bedroom',
  'Bedroom Bathroom',
  'Balcony'
];

export default function RoomTypesForm({ projectId, onNext, onComplete, initialValues }) {
  const [roomType, setRoomType] = useState('');
  const [count, setCount] = useState('');
  const [rooms, setRooms] = useState(initialValues?.rooms || []);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues && initialValues.rooms) {
      setRooms(initialValues.rooms);
    }
  }, [initialValues]);

  const handleAdd = () => {
    let hasError = false;
    const newErrors = {};
    if (!roomType) {
      newErrors.roomType = 'Select a room type';
      hasError = true;
    }
    if (!count || isNaN(count) || Number(count) <= 0) {
      newErrors.count = 'Enter a valid count';
      hasError = true;
    }
    if (rooms.some(r => r.roomType === roomType)) {
      newErrors.roomType = 'Room type already added';
      hasError = true;
    }
    setErrors(newErrors);
    if (hasError) return;
    setRooms([...rooms, { roomType, count }]);
    setRoomType('');
    setCount('');
  };

  const handleRemove = (idx) => {
    setRooms(rooms.filter((_, i) => i !== idx));
  };

  const handleSubmit = () => {
    if (rooms.length === 0) {
      setErrors({ form: 'Add at least one room type' });
      return;
    }
    setErrors({});
    if (onNext) onNext({ rooms });
    if (onComplete) onComplete({ rooms });
  };

  return (
    <Paper elevation={0} sx={{ p: 4, maxWidth: '1000px', mx: 'auto', boxShadow: 'none', border: 'none' }}>
      <Typography variant="h5" mb={3}>Room Types</Typography>
      <Grid container spacing={2} alignItems="center" mb={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Room Type"
            value={roomType}
            onChange={e => setRoomType(e.target.value)}
            fullWidth
            error={Boolean(errors.roomType)}
            helperText={errors.roomType}
          >
            {roomTypeOptions.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={8} sm={4}>
          <TextField
            label="Count"
            type="number"
            value={count}
            onChange={e => setCount(e.target.value)}
            fullWidth
            error={Boolean(errors.count)}
            helperText={errors.count}
          />
        </Grid>
        <Grid item xs={4} sm={2}>
          <IconButton color="primary" onClick={handleAdd} sx={{ mt: { xs: 1, sm: 0 } }}>
            <AddCircle fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
      {rooms.length > 0 && (
        <Box mb={2}>
          {rooms.map((r, idx) => (
            <Grid container spacing={2} alignItems="center" key={idx} mb={1}>
              <Grid item xs={6}>
                <Typography>{r.roomType}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>{r.count}</Typography>
              </Grid>
              <Grid item xs={2}>
                <IconButton color="error" onClick={() => handleRemove(idx)}>
                  <RemoveCircle fontSize="large" />
                </IconButton>
              </Grid>
            </Grid>
          ))}
        </Box>
      )}
      {errors.form && (
        <Typography color="error" mb={2}>{errors.form}</Typography>
      )}
      <Box mt={3} textAlign="right">
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
