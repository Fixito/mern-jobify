import { useRouteError } from 'react-router-dom';

const ErrorComponent = () => {
  const error = useRouteError();
  console.log(error);

  return <h4>Une erreur s&apos;est produite...</h4>;
};

export default ErrorComponent;
