import { useState, useEffect } from 'react';
import {
  Box, Tabs, Tab, Typography, Paper, Button
} from '@mui/material';

import ProjectInfoForm from './tabs/ProjectInfoForm';
import RoomTypesForm from './tabs/RoomTypesForm';
import LoadSelectionForm from './tabs/LoadSelectionForm';
import SwitchSelectionForm from './tabs/SwitchSelectionForm';
import HVACConfigForm from './tabs/HVACConfigForm';
import SensorContactsForm from './tabs/SensorContactsForm';
import DoorLockIntegrationForm from './tabs/DoorLockIntegrationForm';
import FinalIntegrationForm from './tabs/FinalIntegrationForm';
import CurtainSelectionForm from './tabs/CurtainSelectionForm';

function TabPanel({ children, value, index }) {
  return value === index && (
    <Box sx={{ flexGrow: 1, overflow: 'auto', p: 3 }}>
      <Typography component="div">{children}</Typography>
    </Box>
  );
}

export default function ProjectFormsTabs() {
  const [tab, setTab] = useState(0); // Track current tab
  const [projectId, setProjectId] = useState('');
  const [projectType, setProjectType] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('selectedProject');
    if (stored) {
      setSelectedProject(JSON.parse(stored));
    }
  }, []);

  // Function to handle tab change
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const goToNextTab = () => {
    if (tab < 9) {
      setTab(tab + 1); 
    }
  };

 
  const saveFormAndGoNext = (formData) => {
    
    console.log(`Saving form data: ${formData}`);

   
    goToNextTab();
  };
  const handleDownloadPDF = () => {
    const dummyContent = 'This is a test PDF for the project.';
    const blob = new Blob([dummyContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'project-summary.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        height: 'calc(100vh - 64px)', // Adjust based on your app bar height
        p: 2,
        overflow: 'hidden'
      }}
    >
      {/* Vertical Tabs */}
      <Tabs
        orientation="vertical"
        value={tab}
        onChange={handleTabChange}
        sx={{ borderRight: 1, borderColor: 'divider', minWidth: 140, width: 140 }}
      >
        <Tab label="Project Info" />
        <Tab label="Room Types" />
        <Tab label="Light Circuit Selection" />
        <Tab label="Switch Panel Selection" />
        <Tab label="Curtain Selection" />
        <Tab label="HVAC Configuration" />
        <Tab label="Sensors & Contacts" />
        <Tab label="Door Lock Integration" />
        <Tab label="Integration" />
        <Tab label="Downloads" />
      </Tabs>

      {/* Tab content area */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <TabPanel value={tab} index={0}>
          <ProjectInfoForm
            setProjectId={setProjectId}
            setProjectType={setProjectType}
            onNext={goToNextTab}
            initialValues={selectedProject}
          />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <RoomTypesForm
            projectId={projectId}
            onNext={goToNextTab}
            onComplete={(formData) => saveFormAndGoNext('roomTypes', formData)}
            initialValues={selectedProject}
          />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <LoadSelectionForm
            projectId={projectId}
            onNext={goToNextTab}
            onComplete={(formData) => saveFormAndGoNext('loadSelection', formData)}
          />
        </TabPanel>
        <TabPanel value={tab} index={3}>
          <SwitchSelectionForm
            projectId={projectId}
            onNext={goToNextTab}
            onComplete={(formData) => saveFormAndGoNext('switchSelection', formData)}
          />
        </TabPanel>
        <TabPanel value={tab} index={4}>
          <CurtainSelectionForm
            onNext={goToNextTab}
            onComplete={(formData) => saveFormAndGoNext('curtainSelection', formData)}
            initialValues={selectedProject}
          />
        </TabPanel>
        <TabPanel value={tab} index={5}>
          <HVACConfigForm
            projectId={projectId}
            onNext={goToNextTab}
            onComplete={(formData) => saveFormAndGoNext('hvacConfig', formData)}
          />
        </TabPanel>
        <TabPanel value={tab} index={6}>
          <SensorContactsForm
            projectId={projectId}
            onNext={goToNextTab}
            onComplete={(formData) => saveFormAndGoNext('sensorContacts', formData)}
          />
        </TabPanel>
        <TabPanel value={tab} index={7}>
          <DoorLockIntegrationForm
            projectId={projectId}
            onNext={goToNextTab}
            onComplete={(formData) => saveFormAndGoNext('doorLockIntegration', formData)}
          />
        </TabPanel>
        <TabPanel value={tab} index={8}>
          <FinalIntegrationForm
            projectId={projectId}
            onNext={goToNextTab}
            onComplete={(formData) => saveFormAndGoNext('finalIntegration', formData)}
          />
        </TabPanel>
        <TabPanel value={tab} index={9}>
          <Box textAlign="center" mt={5}>
            <Typography variant="h6" gutterBottom>
              Download Project Summary
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleDownloadPDF}
            >
              Download PDF
            </Button>
          </Box>
        </TabPanel>
      </Box>
    </Paper>
  );
}
