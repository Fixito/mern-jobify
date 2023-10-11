import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import { useLoaderData, redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import Wrapper from '../assets/wrappers/StatsContainer';
import { toast } from 'react-toastify';
import StatItem from '../components/StatItem.jsx';

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  try {
    const response = await customFetch('/users/admin/app-stats');
    return response.data;
  } catch (error) {
    toast.error("Vous n'êtes pas autorisé à voir cette page");
    return redirect('/');
  }
};

const Admin = () => {
  const { users, jobs } = useLoaderData();

  return (
    <Wrapper>
      <StatItem
        title='Utilisateurs actuels'
        count={users}
        color='#E9B949'
        bcg='#FCE7C7'
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="Nombre total d'emplois"
        count={jobs}
        color='#647ACB'
        bcg='#E0E8F9'
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};
export default Admin;
