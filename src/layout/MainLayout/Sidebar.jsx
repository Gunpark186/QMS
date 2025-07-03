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
        width: collapsed ? 72 : 220,
        transition: 'width 0.2s',
        background: '#fff',
        height: '100vh',
        borderRight: '1px solid #eee',
        position: 'fixed',
        zIndex: 1200,
        mt: '64px'
      }}
    >
      <List sx={{ pt: 2 }}>
        {dashboardMenu.children.map((item) => (
          <Tooltip key={item.id} title={collapsed ? item.title : ''} placement="right">
            <ListItem
              button
              selected={location.pathname === item.url}
              onClick={() => {
                if (collapsed) setCollapsed(false);
                else navigate(item.url);
              }}
              sx={{
                justifyContent: collapsed ? 'center' : 'flex-start',
                px: collapsed ? 0 : 2,
                mb: 1
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, color: location.pathname === item.url ? 'primary.main' : 'inherit' }}>
                {item.icon && React.createElement(item.icon.type || item.icon, { size: 28 })}
              </ListItemIcon>
              {!collapsed && <ListItemText primary={item.title} sx={{ ml: 2 }} />}
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Box>
  );
}
