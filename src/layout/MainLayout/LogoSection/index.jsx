import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { DASHBOARD_PATH } from 'config';
import VDALogo from '../../../assets/images/vda-logo.png'; // ✅ Relative path

export default function LogoSection() {
  return (
    <Link component={RouterLink} to={DASHBOARD_PATH} aria-label="vda-logo">
      <img src={VDALogo} alt="VDA Logo" width="60" />
    </Link>
  );
}
