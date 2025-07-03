import { useState } from 'react';
import {
  Grid, TextField, Button, MenuItem, IconButton, Typography, Box
} from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import axios from 'axios';

const roomTypes = ['Standard Room', 'King Room', 'Suite Room', 'Deluxe Room'];
const zones = ['Dining', 'Living Room', 'Balcony', 'Entrance'];
const subZones = ['Living Mid', 'Kitchen Mid'];
const switchTypes = ['Victrum', '3 Party'];
const switchFormTypes = ['Flat', 'Sculpted'];
const formFactors = ['BS', 'ES', 'EU'];
const buttonCounts = ['1 Button', '2 Button', '3 Button', '4 Button', '5 Button', '6 Button', '7 Button', '8 Button'];
const combinedTypes = ['1g+Socket', '2mor 3m', '4m'];

export default function SwitchSelectionForm({ projectId, onNext }) {
  const [entries, setEntries] = useState([
    {
      room_type: '', 
      zone: '', 
      sub_zone: '', 
      switch_type: '', 
      switch_form_type: '', 
      form_factor: '', 
      button_count: '', 
      combined_type: '', 
      dry_contact: '', 
      feedback_led: '', 
      gpio_location: '', 
      gpio_used: ''
    }
  ]);
  const [file, setFile] = useState(null);

  const handleChange = (index, e) => {
    const updated = [...entries];
    updated[index][e.target.name] = e.target.value;
    setEntries(updated);
  };

  const handleAdd = () => {
    setEntries([
      ...entries,
      {
        room_type: '', 
        zone: '', 
        sub_zone: '', 
        switch_type: '', 
        switch_form_type: '', 
        form_factor: '', 
        button_count: '', 
        combined_type: '', 
        dry_contact: '', 
        feedback_led: '', 
        gpio_location: '', 
        gpio_used: ''
      }
    ]);
  };

  const handleRemove = (index) => {
    const updated = [...entries];
    updated.splice(index, 1);
    setEntries(updated);
  };

  const handleSubmit = () => {
    
   
     // Trigger the onNext function to switch to the next tab
    if (onNext) {
      onNext();  // This will move to the next tab
    }
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Switch Selection</Typography>

      

      {entries.map((entry, index) => (
        <Grid container spacing={2} alignItems="center" key={index}>
          <Grid item xs={3}>
            <TextField select fullWidth label="Room Type" name="room_type" value={entry.room_type} onChange={(e) => handleChange(index, e)}>
              {roomTypes.map((room) => <MenuItem key={room} value={room}>{room}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField select fullWidth label="Zone" name="zone" value={entry.zone} onChange={(e) => handleChange(index, e)}>
              {zones.map((z) => <MenuItem key={z} value={z}>{z}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField select fullWidth label="Sub Zone" name="sub_zone" value={entry.sub_zone} onChange={(e) => handleChange(index, e)}>
              {subZones.map((sz) => <MenuItem key={sz} value={sz}>{sz}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField select fullWidth label="Switch Type" name="switch_type" value={entry.switch_type} onChange={(e) => handleChange(index, e)}>
              {switchTypes.map((st) => <MenuItem key={st} value={st}>{st}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField select fullWidth label="Switch Form Type" name="switch_form_type" value={entry.switch_form_type} onChange={(e) => handleChange(index, e)}>
              {switchFormTypes.map((sft) => <MenuItem key={sft} value={sft}>{sft}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField select fullWidth label="Form Factor" name="form_factor" value={entry.form_factor} onChange={(e) => handleChange(index, e)}>
              {formFactors.map((ff) => <MenuItem key={ff} value={ff}>{ff}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField select fullWidth label="Button Count" name="button_count" value={entry.button_count} onChange={(e) => handleChange(index, e)}>
              {buttonCounts.map((bc) => <MenuItem key={bc} value={bc}>{bc}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField select fullWidth label="Combined Type" name="combined_type" value={entry.combined_type} onChange={(e) => handleChange(index, e)}>
              {combinedTypes.map((ct) => <MenuItem key={ct} value={ct}>{ct}</MenuItem>)}
            </TextField>
          </Grid>

          {entry.switch_type === '3 Party' && (
            <>
              <Grid item xs={3}>
                <TextField label="Dry Contact per Button" type="number" name="dry_contact" value={entry.dry_contact} onChange={(e) => handleChange(index, e)} />
              </Grid>
              <Grid item xs={3}>
                <TextField select fullWidth label="Feedback LED" name="feedback_led" value={entry.feedback_led} onChange={(e) => handleChange(index, e)}>
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={3}>
                <TextField label="GPIO Location" name="gpio_location" value={entry.gpio_location} onChange={(e) => handleChange(index, e)} />
              </Grid>
              <Grid item xs={3}>
                <TextField label="GPIO Used" name="gpio_used" value={entry.gpio_used} onChange={(e) => handleChange(index, e)} />
              </Grid>
            </>
          )}

          <Grid item xs={1}>
            <IconButton color="primary" onClick={handleAdd}>
              <AddCircle />
            </IconButton>
            {index > 0 && (
              <IconButton color="error" onClick={() => handleRemove(index)}>
                <RemoveCircle />
              </IconButton>
            )}
          </Grid>
        </Grid>
      ))}

      <Box mt={2} textAlign="right">
        <Button variant="contained" onClick={handleSubmit}>Save & Next</Button>
      </Box>
    </Box>
  );
}
