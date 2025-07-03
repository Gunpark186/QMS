import React, { useEffect, useState } from 'react';
import { Grid, Box, Button } from '@mui/material';

import { gridSpacing } from 'store/constant';


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
        <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ mt: 4, flexWrap: 'nowrap' }}>
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
