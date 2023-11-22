import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// react query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// layouts
import { DashboardLayout, HomeLayout } from './layouts';
// pages
import {
  AddJob,
  Admin,
  AllJobs,
  EditJob,
  ErrorPage,
  Landing,
  Login,
  Profile,
  Register,
  Stats
} from './pages';
// components
import ErrorComponent from './components/ErrorComponent.jsx';

//actions
import { action as registerAction } from './pages/Register.jsx';
import { action as loginAction } from './pages/Login.jsx';
import { action as addJobAction } from './pages/AddJob.jsx';
import { action as editJobAction } from './pages/EditJob.jsx';
import { action as deleteJobAction } from './pages/DeleteJob.jsx';
import { action as profileAction } from './pages/Profile.jsx';

// loaders
import { loader as dashboardLoader } from './layouts/DashboardLayout.jsx';
import { loader as alljobsLoader } from './pages/AllJobs.jsx';
import { loader as editJobLoader } from './pages/EditJob.jsx';
import { loader as adminLoader } from './pages/Admin.jsx';
import { loader as statsLoader } from './pages/Stats.jsx';

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000 // 5 minutes
    }
  }
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: 'register',
        element: <Register />,
        action: registerAction
      },
      { path: 'login', element: <Login />, action: loginAction(queryClient) },
      {
        path: 'dashboard',
        element: (
          <DashboardLayout
            isDarkThemeEnabled={isDarkThemeEnabled}
            queryClient={queryClient}
          />
        ),
        loader: dashboardLoader(queryClient),
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction(queryClient)
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader: alljobsLoader(queryClient),
            errorElement: <ErrorComponent />
          },
          {
            path: 'stats',
            element: <Stats />,
            loader: statsLoader(queryClient),
            errorElement: <ErrorComponent />
          },
          {
            path: 'profile',
            element: <Profile />,
            action: profileAction(queryClient)
          },
          { path: 'admin', element: <Admin />, loader: adminLoader },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            action: editJobAction(queryClient),
            loader: editJobLoader(queryClient)
          },
          { path: 'delete-job/:id', action: deleteJobAction(queryClient) }
        ]
      }
    ]
  }
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
