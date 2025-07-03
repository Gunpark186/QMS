import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

function getDefaultIcon(label, color) {
  if (label.toLowerCase().includes('completed')) {
    return <CheckCircleIcon sx={{ fontSize: 36, color: color || '#fff' }} />;
  }
  if (label.toLowerCase().includes('pending')) {
    return <HourglassEmptyIcon sx={{ fontSize: 36, color: color || '#fff' }} />;
  }
  return null;
}

export default function SummaryStatCard({ label, value, color, icon }) {
  const textColor = '#fff';
  return (
    <Card sx={{
      borderRadius: 4,
      boxShadow: 8,
      minWidth: 240,
      minHeight: 140,
      background: color || '#1976d2',
      textAlign: 'center',
      transition: '0.3s',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': {
        boxShadow: 16,
        transform: 'translateY(-6px) scale(1.03)',
      },
    }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
        <Box mb={1} sx={{ fontSize: 40, background: 'rgba(255,255,255,0.18)', borderRadius: '50%', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          {icon || getDefaultIcon(label, textColor)}
        </Box>
        <Typography variant="h3" fontWeight={800} color={textColor} mb={0.5}>
          {value}
        </Typography>
        <Typography variant="subtitle1" color={textColor} fontWeight={500}>
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
}
