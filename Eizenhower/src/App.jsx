import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {Toaster} from 'sonner';
import LoginPage from './LoginPage';
import SignupPage from './SignUpPage.jsx';
import TaskLayout from './TaskLayout';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />
    },
    {
      path: "/signup",
      element: <SignupPage />
    },
    {
      path: "/task",
      element: <TaskLayout />
    },
  ]);

  return (<>
    <RouterProvider router={router} />
    <Toaster richColors/>
  </>

  );
}

export default App;
