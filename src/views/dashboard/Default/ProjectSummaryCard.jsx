import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
  CircularProgress,
  Grid
} from '@mui/material';
import { green, orange, red, purple, cyan, pink, grey, blue } from '@mui/material/colors';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = [green[500], orange[500], red[500], purple[500]];

export default function ProjectSummaryCard({ isLoading, formStatus }) {
  if (isLoading) {
    return (
      <Card
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: 4,
          background: `linear-gradient(135deg, ${blue[300]}, ${cyan[500]})`,
          height: '100%',
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight={600} color="white">
            Loading Project Summary...
          </Typography>
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress color="inherit" />
          </Box>
        </CardContent>
      </Card>
    );
  }

  const completedForms = Object.values(formStatus).filter(Boolean).length;
  const totalForms = Object.keys(formStatus).length;
  const progress = (completedForms / totalForms) * 100;

  const chartData = [
    { name: 'Completed', value: completedForms },
    { name: 'Remaining', value: totalForms - completedForms }
  ];

  // Dynamic background color based on progress
  const cardColor = progress >= 75 ? green[500] : progress >= 50 ? orange[500] : red[500];

  return (
    <Card
      sx={{
        borderRadius: 3,
        background: grey[50],
        boxShadow: 12,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: 16,
          transform: 'scale(1.05)',
          background: `linear-gradient(135deg, ${cardColor}, ${pink[500]})`,
        },
        padding: 3,
      }}
    >
      <CardContent>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          Project Summary
        </Typography>

        <Grid container spacing={2} mt={2} alignItems="center">
          {/* Left Section: Progress and Linear Progress */}
          <Grid item xs={12} md={8}>
            <Typography variant="body1" color="text.secondary">
              {completedForms} of {totalForms} forms completed
            </Typography>

            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                mt: 2,
                height: 12,
                borderRadius: 6,
                backgroundColor: grey[300],
                '& .MuiLinearProgress-bar': {
                  backgroundColor: cardColor,
                },
              }}
            />
          </Grid>

          {/* Right Section: Pie Chart */}
          <Grid item xs={12} md={4}>
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={50}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={3}>
          {/* Left Chip: Status */}
          <Grid item>
            <Chip
              label="Status"
              color="primary"
              sx={{
                backgroundColor: cardColor,
                color: 'white',
                fontWeight: 'bold',
                borderRadius: 5,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            />
          </Grid>

          {/* Right Chip: Progress Percentage */}
          <Grid item>
            <Chip
              label={`${Math.round(progress)}%`}
              color={progress < 50 ? 'error' : 'success'}
              sx={{
                fontWeight: 'bold',
                backgroundColor: progress < 50 ? red[500] : green[500],
                color: 'white',
                borderRadius: 5,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
