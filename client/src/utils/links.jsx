import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { MdAdminPanelSettings } from 'react-icons/md';

const links = [
  { text: 'Ajouter un emploi', path: '.', icon: <FaWpforms /> },
  { text: 'Tous les emplois', path: 'all-jobs', icon: <MdQueryStats /> },
  { text: 'Statistiques', path: 'stats', icon: <IoBarChartSharp /> },
  { text: 'Profil', path: 'profile', icon: <ImProfile /> },
  { text: 'Admin', path: 'admin', icon: <MdAdminPanelSettings /> }
];

export default links;
