import { Form, redirect, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage.js';
import { FormRow, Logo, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch.js';
import { toast } from 'react-toastify';

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/auth/register', data);
    toast.success('Inscription réussie');
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method='POST' className='form'>
        <Logo />
        <h4>Inscription</h4>
        <FormRow type='text' name='name' labelText='Prénom' />
        <FormRow type='text' name='lastName' labelText='Nom' />
        <FormRow type='text' name='location' labelText='Location' />
        <FormRow type='email' name='email' labelText='Email' />
        <FormRow type='password' name='password' labelText='Mot de passe' />
        <SubmitBtn label="S'inscrire" loadingLabel='Inscription...' formBtn />
        <p>
          Déjà membre ?{' '}
          <Link to='/login' className='member-btn'>
            Se connecter
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
