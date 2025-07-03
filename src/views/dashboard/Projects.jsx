import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Stack,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import CreateProjectDialog from '../../components/CreateProjectDialog';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  // Load data on mount
  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem('projectData')) || [];
    setProjects(storedProjects);
  }, []);

  // Handle creation of new project
  const handleCreate = (project) => {
    const updatedProjects = [
      ...projects,
      {
        name: project.projectName,
        crm: project.crmProjectNumber,
        country: project.country,
        createdDate: project.createdDate,
        createdTime: project.createdTime
      }
    ];
    setProjects(updatedProjects);
    localStorage.setItem('projectData', JSON.stringify(updatedProjects));
  };

  // Handle deletion
  const handleDelete = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
    localStorage.setItem('projectData', JSON.stringify(updatedProjects));
  };

  // Placeholder for edit action
  const handleEdit = (project) => {
    // You can store the project in localStorage or context before navigating
    localStorage.setItem('editProject', JSON.stringify(project));
    navigate('/projectforms'); // You may want to support edit mode in form
  };

  return (
    <Box>
      <CreateProjectDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onCreate={handleCreate}
      />
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" sx={{ color: '#003366', fontWeight: 'bold' }}>
          Projects
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{
            borderRadius: 2,
            background: 'linear-gradient(to right, #3f51b5, #2196f3)',
            color: '#fff',
            fontWeight: 'bold',
            textTransform: 'none'
          }}
        >
          Create New
        </Button>
      </Stack>

      <Paper elevation={4} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f7fa' }}>
              <TableCell><strong>Project Name</strong></TableCell>
              <TableCell><strong>CRM Project No</strong></TableCell>
              <TableCell><strong>Country</strong></TableCell>
              <TableCell><strong>Created Date</strong></TableCell>
              <TableCell><strong>Created Time</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="textSecondary">
                    No projects available. Click <strong>Create New</strong> to get started.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project, index) => (
                <TableRow
                  key={index}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    // Find the full project object from localStorage
                    const allProjects = JSON.parse(localStorage.getItem('projectData')) || [];
                    const fullProject = allProjects[index];
                    localStorage.setItem('selectedProject', JSON.stringify(fullProject));
                    navigate('/projectforms');
                  }}
                >
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.crm}</TableCell>
                  <TableCell>{project.country}</TableCell>
                  <TableCell>{project.createdDate}</TableCell>
                  <TableCell>{project.createdTime}</TableCell>
                  <TableCell align="center" onClick={e => e.stopPropagation()}>
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => handleEdit(project)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => handleDelete(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
