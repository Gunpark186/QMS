import React, { useRef, useEffect } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import dashboardMenu from '../../menu-items/dashboard';

export default function Sidebar({ collapsed, setCollapsed }) {
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Collapse sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setCollapsed(true);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setCollapsed]);

  return (
    <Box
      ref={sidebarRef}
      sx={{
        width: collapsed ? 72 : 140, // further reduced width when expanded
        transition: 'width 0.2s',
        background: '#fff',
        height: 'calc(100vh - 64px)', // only below header
        marginTop: '64px', // push below header
        position: 'fixed',
        zIndex: 1200,
        left: 0,
        top: 0 // start at top, but margin pushes it down
      }}
    >
      <List sx={{ pt: 2 }}>
        {dashboardMenu.children.map((item) => (
          <Tooltip key={item.id} title={collapsed ? item.title : ''} placement="right">
            <ListItem
              button
              selected={location.pathname === item.url}
              onClick={() => {
                if (collapsed) {
                  setCollapsed(false);
                  setTimeout(() => navigate(item.url), 200); // Expand, then route after animation
                } else {
                  navigate(item.url);
                }
              }}
              sx={{
                justifyContent: collapsed ? 'center' : 'flex-start',
                px: collapsed ? 0 : 2,
                mb: 1,
                cursor: 'pointer',
                backgroundColor: location.pathname === item.url ? 'rgba(33, 150, 243, 0.12)' : 'transparent',
                borderRadius: 2,
                transition: 'background-color 0.2s'
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, color: location.pathname === item.url ? 'primary.main' : 'inherit' }}>
                {item.icon && React.createElement(item.icon.type || item.icon, { size: 28 })}
              </ListItemIcon>
              {!collapsed && <ListItemText primary={item.title} sx={{ ml: 2, cursor: 'pointer' }} />}
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Box>
  );
}
