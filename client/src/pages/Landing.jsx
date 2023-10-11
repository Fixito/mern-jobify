import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/LandingPage.js';
import main from '../assets/images/main.svg';
import { Logo } from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>Application de suivi de l&apos;emploi</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            repudiandae nostrum quaerat cum dicta? Doloremque tempora corporis
            cumque soluta tempore, voluptas esse nisi error! Quia fuga nam
            officia aliquam dignissimos?
          </p>
          <Link to='register' className='btn register-link'>
            S&apos;incrire
          </Link>
          <Link to='login' className='btn'>
            Se connecter / Démo
          </Link>
        </div>
        <img src={main} alt="Recherche d'emploi" className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
