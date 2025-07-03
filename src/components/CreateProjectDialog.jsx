import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, MenuItem
} from '@mui/material';

const countryList = ['USA', 'UK', 'India', 'Germany', 'France', 'Other'];
const roomTypeOptions = ['King', 'Queen', 'Twin', 'Suite', 'Single', 'Double'];

const initialForm = {
  projectName: '',
  crmOpportunityNumber: '',
  crmProjectNumber: '',
  numberOfRooms: '',
  numberOfRoomTypes: '',
  roomTypes: [],
  country: ''
};

export default function CreateProjectDialog({ open, onClose, onCreate }) {
  const [form, setForm] = useState(initialForm);
  const [showRoomTypes, setShowRoomTypes] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoomTypeChange = (idx, field, value) => {
    setForm((prev) => {
      const roomTypes = [...prev.roomTypes];
      roomTypes[idx][field] = value;
      return { ...prev, roomTypes };
    });
  };

  const handleAddRoomTypes = () => {
    const count = parseInt(form.numberOfRoomTypes, 10);
    if (!isNaN(count) && count > 0) {
      setForm((prev) => ({
        ...prev,
        roomTypes: Array.from({ length: count }, () => ({ type: '', qty: '' }))
      }));
      setShowRoomTypes(true);
    }
  };

  const handleSubmit = () => {
    onCreate({
      ...form,
      createdDate: new Date().toLocaleDateString(),
      createdTime: new Date().toLocaleTimeString()
    });
    setForm(initialForm);
    setShowRoomTypes(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Project</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Enter the project name" name="projectName" value={form.projectName} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <TextField label="CRM Opportunity number" name="crmOpportunityNumber" value={form.crmOpportunityNumber} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="CRM project number" name="crmProjectNumber" value={form.crmProjectNumber} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Number of rooms" name="numberOfRooms" value={form.numberOfRooms} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={8}>
            <TextField label="Number of room types" name="numberOfRoomTypes" value={form.numberOfRoomTypes} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={4} style={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="outlined" onClick={handleAddRoomTypes} fullWidth>Add</Button>
          </Grid>
          {showRoomTypes && form.roomTypes.map((rt, idx) => (
            <React.Fragment key={idx}>
              <Grid item xs={6}>
                <TextField
                  select
                  label={`Type ${idx + 1}`}
                  value={rt.type}
                  onChange={e => handleRoomTypeChange(idx, 'type', e.target.value)}
                  fullWidth
                >
                  {roomTypeOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                Qty
              </Grid>
              <Grid item xs={4}>
                <TextField value={rt.qty} onChange={e => handleRoomTypeChange(idx, 'qty', e.target.value)} fullWidth />
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <TextField select label="Country" name="country" value={form.country} onChange={handleChange} fullWidth>
              {countryList.map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Create</Button>
      </DialogActions>
    </Dialog>
  );
}
