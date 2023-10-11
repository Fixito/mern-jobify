/* eslint-disable react-refresh/only-export-components */
import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants.js';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';

const singleJobQuery = (id) => {
  return {
    queryKey: ['job', id],
    queryFn: async () => {
      const { data } = await customFetch(`/jobs/${id}`);
      return data;
    }
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singleJobQuery(params.id));
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect('/dashboard/all-jobs');
    }
  };

export const action =
  (queryClient) =>
  async ({ params, request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.patch(`/jobs/${params.id}`, data);
      queryClient.invalidateQueries(['jobs']);
      toast.success('Offre éditée avec succès');
      return redirect('/dashboard/all-jobs');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const EditJob = () => {
  const id = useLoaderData();
  const {
    data: { job }
  } = useQuery(singleJobQuery(id));

  return (
    <Wrapper>
      <Form method='POST' className='form'>
        <h4 className='form-title'>Éditer l&apos;offre</h4>
        <div className='form-center'>
          <FormRow
            type='text'
            name='position'
            labelText='Position'
            defaultValue={job.position}
          />
          <FormRow
            type='text'
            name='company'
            labelText='Compagnie'
            defaultValue={job.company}
          />
          <FormRow
            type='text'
            name='jobLocation'
            labelText='Localisation'
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            type='text'
            name='jobStatus'
            labelText='Statut'
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            type='text'
            name='jobType'
            labelText='Statut'
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn label='Éditer' loadingLabel='Édition...' formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;
