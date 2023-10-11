import { Link, useRouteError } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ErrorPage.js';
import img from '../assets/images/not-found.svg';

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt='Introuvable' />
          <h3>Page introuvable</h3>
          <p>Nous n&apos;arrivons pas à trouver la page que vous recherchez.</p>
          <Link to='/'>Retour à l&apos;accueil</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h3>Une erreur s&apos;est produite</h3>
    </Wrapper>
  );
};
export default ErrorPage;
