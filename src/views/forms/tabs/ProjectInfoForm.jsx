import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Box,
  Paper,
  Typography,
  Tabs,
  Tab
} from '@mui/material';

const countries = ['UAE', 'India', 'Italy'];
const projectTypes = ['full', 'mock'];
const systemRequiredOptions = ['Ethoes', 'EM'];

export default function ProjectInfoForm({ setProjectId, setProjectType, onNext, initialValues }) {
  const navigate = useNavigate();

  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({
    crm_no: '',
    project_name: '',
    country: '',
    project_type: '',
    customer_name: '',
    consultant_name: '',
    mep_contractor_name: '',
    operator_name: '',
    salesperson_name: '',
    ctl_name: '',
    crm_opportunity_number: '',
    crm_project_number: '',
    system_required: '',
    ...initialValues // prefill from popup if available
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setForm((prev) => ({ ...prev, ...initialValues }));
    }
  }, [initialValues]);

  const handleTabChange = (e, newValue) => setTab(newValue);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error on input
  };

  const validate = () => {
    const newErrors = {};
    if (tab === 0) {
      if (!form.project_name.trim()) newErrors.project_name = 'Required';
      if (!form.crm_opportunity_number.trim()) newErrors.crm_opportunity_number = 'Required';
      if (!form.crm_project_number.trim()) newErrors.crm_project_number = 'Required';
      if (!form.system_required) newErrors.system_required = 'Required';
    } else {
      if (!form.customer_name.trim()) newErrors.customer_name = 'Required';
      if (!form.consultant_name.trim()) newErrors.consultant_name = 'Required';
      if (!form.mep_contractor_name.trim()) newErrors.mep_contractor_name = 'Required';
      if (!form.operator_name.trim()) newErrors.operator_name = 'Required';
      if (!form.salesperson_name.trim()) newErrors.salesperson_name = 'Required';
      if (!form.ctl_name.trim()) newErrors.ctl_name = 'Required';
    }
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const now = new Date();
    const newProject = {
      crm: form.crm_no,
      name: form.project_name,
      country: form.country,
      project_type: form.project_type,
      createdDate: now.toLocaleDateString(),
      createdTime: now.toLocaleTimeString()
    };

    const existingProjects = JSON.parse(localStorage.getItem('projectData')) || [];
    existingProjects.push(newProject);
    localStorage.setItem('projectData', JSON.stringify(existingProjects));

    if (onNext) onNext();
  };

  return (
    <Paper elevation={2} sx={{ p: 4, maxWidth: '1000px', mx: 'auto', boxShadow: 'none', border: 'none'}}>
      <Typography variant="h5" mb={3}>
        Project Info
      </Typography>
      <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="General Info" />
        <Tab label="Project Information" />
      </Tabs>
      {tab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Project Name"
              name="project_name"
              value={form.project_name}
              onChange={handleChange}
              error={Boolean(errors.project_name)}
              helperText={errors.project_name}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="CRM Opportunity Number"
              name="crm_opportunity_number"
              value={form.crm_opportunity_number}
              onChange={handleChange}
              error={Boolean(errors.crm_opportunity_number)}
              helperText={errors.crm_opportunity_number}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="CRM Project Number"
              name="crm_project_number"
              value={form.crm_project_number}
              onChange={handleChange}
              error={Boolean(errors.crm_project_number)}
              helperText={errors.crm_project_number}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="System Required"
              name="system_required"
              value={form.system_required}
              onChange={handleChange}
              error={Boolean(errors.system_required)}
              helperText={errors.system_required}
              variant="outlined"
            >
              {systemRequiredOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      )}
      {tab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Customer / Client Name"
              name="customer_name"
              value={form.customer_name}
              onChange={handleChange}
              error={Boolean(errors.customer_name)}
              helperText={errors.customer_name}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Consultant Name"
              name="consultant_name"
              value={form.consultant_name}
              onChange={handleChange}
              error={Boolean(errors.consultant_name)}
              helperText={errors.consultant_name}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="MEP Contractor Name"
              name="mep_contractor_name"
              value={form.mep_contractor_name}
              onChange={handleChange}
              error={Boolean(errors.mep_contractor_name)}
              helperText={errors.mep_contractor_name}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Operator Name"
              name="operator_name"
              value={form.operator_name}
              onChange={handleChange}
              error={Boolean(errors.operator_name)}
              helperText={errors.operator_name}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Salesperson Name"
              name="salesperson_name"
              value={form.salesperson_name}
              onChange={handleChange}
              error={Boolean(errors.salesperson_name)}
              helperText={errors.salesperson_name}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="CTL Name"
              name="ctl_name"
              value={form.ctl_name}
              onChange={handleChange}
              error={Boolean(errors.ctl_name)}
              helperText={errors.ctl_name}
              variant="outlined"
            />
          </Grid>
        </Grid>
      )}
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12}>
          <Box textAlign="right">
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              sx={{ px: 4, py: 1.5 }}
            >
              Save & Next
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
