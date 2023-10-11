import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants.js';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

// eslint-disable-next-line react-refresh/only-export-components
export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.post('/jobs', data);
      queryClient.invalidateQueries(['jobs']);
      toast.success('Emploi ajouté avec succès');
      return redirect('all-jobs');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const AddJob = () => {
  const { user } = useOutletContext();

  return (
    <Wrapper>
      <Form method='POST' className='form'>
        <h4 className='form-title'>Ajouter une offre</h4>
        <div className='form-center'>
          <FormRow type='text' name='position' labelText='Position' />
          <FormRow type='text' name='company' labelText='Compagnie' />
          <FormRow
            type='text'
            name='jobLocation'
            labelText='Localisation'
            defaultValue={user.location}
          />
          <FormRowSelect
            name='jobStatus'
            labelText='Status'
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name='jobType'
            labelText='Type'
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn label='Ajouter' loadingLabel='Ajout...' formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
