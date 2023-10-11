import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch.js';
import { redirect } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
export const action =
  (queryClient) =>
  async ({ params }) => {
    try {
      await customFetch.delete(`/jobs/${params.id}`);
      queryClient.invalidateQueries(['jobs']);
      toast.success('Offre supprimée avec succès');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }

    return redirect('/dashboard/all-jobs');
  };

const DeleteJob = () => {
  return <div>DeleteJob</div>;
};

export default DeleteJob;
