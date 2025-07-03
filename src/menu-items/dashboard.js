// assets
import { IconDashboard, IconClipboardList, IconLogout } from '@tabler/icons-react';

// constant
const icons = { IconDashboard, IconClipboardList, IconLogout };

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
      breadcrumbs: false
    },
    {
      id: 'projects',
      title: 'Projects',
      type: 'item',
      url: '/dashboard/projects',
      icon: icons.IconClipboardList,
      breadcrumbs: false
    },{
      id: 'logout',
      title: 'Logout',
      type: 'item',
      url: 'dashboard/logout',
      icon: icons.IconLogout,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
