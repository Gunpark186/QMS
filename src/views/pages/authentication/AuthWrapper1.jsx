// material-ui
import { styled } from '@mui/material/styles';

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapper1 = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage: `url('https://w0.peakpx.com/wallpaper/973/406/HD-wallpaper-smart-home-solutions-smart-home-automation-smart-ac-smart-light-smart-switch.jpg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundColor: theme.palette.grey[100], // fallback color
}));

export default AuthWrapper1;
