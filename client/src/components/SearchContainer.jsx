import { FormRow, FormRowSelect } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../../../utils/constants';
import { useAllJobsContext } from '../pages/AllJobs';

const SearchContainer = () => {
  const { searchValues } = useAllJobsContext();
  const { search, jobStatus, jobType, sort } = searchValues;
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeout = null;

    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 1000);
    };
  };

  return (
    <Wrapper>
      <Form className='form'>
        <h5 className='form-title'>Formulaire de recherche</h5>
        <div className='form-center'>
          {/* search */}
          <FormRow
            labelText='Rechercher'
            type='search'
            name='search'
            defaultValue={search}
            onChange={debounce((form) => submit(form))}
          />
          {/* job status */}
          <FormRowSelect
            labelText='Statut'
            name='jobStatus'
            list={['tous', ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          {/* job type */}
          <FormRowSelect
            labelText='Type'
            name='jobType'
            list={['tous', ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          {/* sort */}
          <FormRowSelect
            labelText='Trier'
            name='sort'
            defaultValue={sort}
            list={[...Object.values(JOB_SORT_BY)]}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          {/* reset */}
          <Link to='/dashboard/all-jobs' className='btn form-btn delete-btn'>
            Réinitialiser les valeurs de recherche
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
