import React, { useEffect, useState } from 'react';
import { Grid, Box, Button } from '@mui/material';

import { gridSpacing } from 'store/constant';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';


// Replace these with your actual forms or status cards
import SummaryStatCard from './SummaryStatCard';

export default function ProjectDashboard() {
  const [isLoading, setLoading] = useState(true);
  const [formStatus, setFormStatus] = useState({
    projectInfo: false,
    roomTypes: false,
    loadSelection: false,
    switchSelection: false,
    hvacConfig: false,
    sensorContacts: false,
    doorLockIntegration: false,
    finalIntegration: false
  });

  useEffect(() => {
    setLoading(false);
  }, []);

  const isAllFormsCompleted = Object.values(formStatus).every(status => status);

  // Placeholder values, replace with real data logic as needed
  const quotesCompleted365 = 42;
  const pending365 = 10;
  const quotesCompleted30 = 8;
  const pending30 = 3;

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ flexWrap: 'nowrap' }}>
          <Grid item xs={12} sm={6} md={3} display="flex" justifyContent="center">
            <SummaryStatCard label="Quotes Completed (365 days)" value={quotesCompleted365} color="#4caf50" />
          </Grid>
          <Grid item xs={12} sm={6} md={3} display="flex" justifyContent="center">
            <SummaryStatCard label="Pending Status (365 days)" value={pending365} color="#ff9800" />
          </Grid>
          <Grid item xs={12} sm={6} md={3} display="flex" justifyContent="center">
            <SummaryStatCard label="Quotes Completed (30 days)" value={quotesCompleted30} color="#2196f3" />
          </Grid>
          <Grid item xs={12} sm={6} md={3} display="flex" justifyContent="center">
            <SummaryStatCard label="Pending Status (30 days)" value={pending30} color="#f44336" />
          </Grid>
        </Grid>
      </Grid>


<Grid container spacing={gridSpacing}>
  {/* ...stat cards grid... */}

  {/* Project List Section */}
  <Grid item xs={12} mt={4}>
    <Box display="flex" justifyContent="center">
      <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 900, borderRadius: 4, boxShadow: 3, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        <Typography variant="h5" fontWeight={700} color="#003366" gutterBottom>
          Recent Projects
        </Typography>
        <Table>
          <TableHead>
            <TableRow sx={{ background: 'rgba(33, 150, 243, 0.08)' }}>
              <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Project Name</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>CRM Project No</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Created</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              { name: 'Project Alpha', crm: 'CRM001', createdDate: '2025-07-03', createdTime: '10:00 AM', status: 'Active' },
              { name: 'Project Beta', crm: 'CRM002', createdDate: '2025-07-02', createdTime: '11:30 AM', status: 'Completed' }
            ].map((project, idx) => (
              <TableRow
                key={idx}
                hover
                sx={{
                  transition: 'background 0.2s',
                  '&:hover': { background: '#e3f2fd' },
                  background: project.status === 'Active' ? '#e8f5e9' : '#f5f5f5'
                }}
              >
                <TableCell sx={{ fontWeight: 500 }}>{project.name}</TableCell>
                <TableCell>{project.crm}</TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" color="text.primary">{project.createdDate}</Typography>
                    <Typography variant="caption" color="text.secondary">{project.createdTime}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box sx={{
                      px: 2.5,
                      py: 0.5,
                      borderRadius: '20px',
                      minWidth: 120,
                      maxWidth: 120,
                      background:
                        project.status === 'Active'
                          ? '#4caf50'
                          : project.status === 'Completed'
                          ? '#1976d2'
                          : project.status === 'Pending'
                          ? '#ff9800'
                          : '#bdbdbd',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      fontWeight: 500
                    }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 500, color: '#fff', flex: 1, textAlign: 'center' }}
                      >
                        {project.status}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  </Grid>
</Grid>

      {isAllFormsCompleted && (
        <Grid item xs={12}>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button variant="contained" color="success">
              Download Project Summary
            </Button>
          </Box>
        </Grid>
      )}
    </Grid>
  );
}
