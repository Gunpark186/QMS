import PropTypes from 'prop-types';
// material-ui
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

const FrostedCard = styled(MainCard)(({ theme }) => ({
  maxWidth: 475,
  margin: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.15)',
  borderRadius: '16px',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  color: '#fff', // optional: override text color
}));

export default function AuthCardWrapper({ children, ...other }) {
  return (
    <FrostedCard content={false} {...other}>
      <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>
        {children}
      </Box>
    </FrostedCard>
  );
}

AuthCardWrapper.propTypes = {
  children: PropTypes.node,
  other: PropTypes.any
};
