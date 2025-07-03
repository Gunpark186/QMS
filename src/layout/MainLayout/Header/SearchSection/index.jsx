import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popper from '@mui/material/Popper';
import Box from '@mui/material/Box';

// third party
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';

// project imports
import Transitions from 'ui-component/extended/Transitions';

// assets
import { IconAdjustmentsHorizontal, IconSearch, IconX } from '@tabler/icons-react';

function HeaderAvatarComponent({ children, ...others }, ref) {
  const theme = useTheme();

  return (
    <Avatar
      ref={ref}
      variant="rounded"
      sx={{
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        bgcolor: 'secondary.light',
        color: 'secondary.dark',
        '&:hover': {
          bgcolor: 'secondary.dark',
          color: 'secondary.light'
        }
      }}
      {...others}
    >
      {children}
    </Avatar>
  );
}

const HeaderAvatar = forwardRef(HeaderAvatarComponent);

// ==============================|| SEARCH INPUT - MOBILE||============================== //

function MobileSearch({ value, setValue, popupState }) {
  const theme = useTheme();

  return (
    <OutlinedInput
      id="input-search-header"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search"
      startAdornment={
        <InputAdornment position="start">
          <IconSearch stroke={1.5} size="16px" />
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          <HeaderAvatar>
            <IconAdjustmentsHorizontal stroke={1.5} size="20px" />
          </HeaderAvatar>
          <Box sx={{ ml: 2 }}>
            <Avatar
              variant="rounded"
              sx={{
                ...theme.typography.commonAvatar,
                ...theme.typography.mediumAvatar,
                bgcolor: 'orange.light',
                color: 'orange.dark',
                '&:hover': {
                  bgcolor: 'orange.dark',
                  color: 'orange.light'
                }
              }}
              {...bindToggle(popupState)}
            >
              <IconX stroke={1.5} size="20px" />
            </Avatar>
          </Box>
        </InputAdornment>
      }
      aria-describedby="search-helper-text"
      inputProps={{ 'aria-label': 'weight', sx: { bgcolor: 'transparent', pl: 0.5 } }}
      sx={{ width: '100%', ml: 0.5, px: 2, bgcolor: 'background.paper' }}
    />
  );
}

// ==============================|| SEARCH INPUT ||============================== //

export default function SearchSection() {
    return null; // Component safely disabled
  }

HeaderAvatarComponent.propTypes = { children: PropTypes.node, others: PropTypes.any };

MobileSearch.propTypes = { value: PropTypes.string, setValue: PropTypes.func, popupState: PropTypes.any };