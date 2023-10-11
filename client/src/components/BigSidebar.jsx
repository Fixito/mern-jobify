import Wrapper from '../assets/wrappers/BigSidebar.js';
import NavLinks from './NavLinks.jsx';
import Logo from './Logo.jsx';
import { useDashboardContext } from '../layouts/DashboardLayout.jsx';

const BigSidebar = () => {
  const { showSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
