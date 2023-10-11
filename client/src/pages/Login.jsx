import { Form, Link, redirect, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage.js';
import { Logo, FormRow, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch.js';
import { toast } from 'react-toastify';

// eslint-disable-next-line react-refresh/only-export-components
export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.post('/auth/login', data);
      queryClient.invalidateQueries();
      toast.success('Connexion réussie');
      return redirect('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const Login = () => {
  const navigate = useNavigate();

  const loginDemoUser = async () => {
    const data = { email: 'test@test.com', password: 'secret123' };

    try {
      await customFetch.post('/auth/login', data);
      toast.success("Faîtes un test de l'application");
      navigate('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <Wrapper>
      <Form method='POST' className='form'>
        <Logo />
        <h4>Connexion</h4>
        <FormRow type='email' name='email' labelText='Email' />
        <FormRow type='password' name='password' labelText='Mot de passe' />
        <SubmitBtn label='Se connecter' loadingLabel='Connexion...' />
        <button type='button' className='btn btn-block' onClick={loginDemoUser}>
          Explorer l&apos;application
        </button>
        <p>
          Pas encore membre ?{' '}
          <Link to='/register' className='member-btn'>
            S&apos;inscrire
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
