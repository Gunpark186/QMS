// assets
import { IconDashboard, IconClipboardList } from '@tabler/icons-react';

// constant
const icons = { IconDashboard, IconClipboardList };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
 
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbs: false,
      sx: { cursor: 'pointer' } // Ensure pointer cursor
    },
    {
      id: 'projects',
      title: 'Projects',
      type: 'item',
      url: '/dashboard/projects',
      icon: icons.IconClipboardList,
      breadcrumbs: false,
      sx: { cursor: 'pointer' } // Ensure pointer cursor
    }
  ]
};

export default dashboard;
