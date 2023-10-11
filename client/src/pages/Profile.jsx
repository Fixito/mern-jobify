import { FormRow, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { redirect, useOutletContext } from 'react-router-dom';
import { Form } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

// eslint-disable-next-line react-refresh/only-export-components
export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('avatar');

    if (file && file.size > 500000) {
      toast.error("La taille de l'image est trop grande");
      return null;
    }

    try {
      await customFetch.patch('/users/update-user', formData);
      queryClient.invalidateQueries(['user']);
      toast.success('Profil mis à jour avec succès');
      return redirect('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return null;
    }
  };

const Profile = () => {
  const { user } = useOutletContext();
  const { name, lastName, email, location } = user;

  return (
    <Wrapper>
      <Form method='POST' className='form' encType='multipart/form-data'>
        <h4 className='form-title'>Profil</h4>
        <div className='form-center'>
          {/* file input */}
          <div className='form-row'>
            <label htmlFor='avatar' className='form-label'>
              Sélectionnez un fichier image (max 0.5 MB)
            </label>
            <input
              type='file'
              name='avatar'
              id='avatar'
              className='form-input'
              accept='image/*'
            />
          </div>
          <FormRow
            type='text'
            name='name'
            labelText='Prénom'
            defaultValue={name}
          />
          <FormRow
            type='text'
            name='lastName'
            labelText='Nom'
            defaultValue={lastName}
          />
          <FormRow
            type='email'
            name='email'
            labelText='Email'
            defaultValue={email}
          />
          <FormRow
            type='text'
            name='location'
            labelText='Localisation'
            defaultValue={location}
          />
          <SubmitBtn
            label='Sauvegarder'
            loadingLabel='Sauvegarde en cours...'
            formBtn
          />
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
