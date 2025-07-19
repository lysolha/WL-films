import { RouterProvider } from 'react-router-dom';
import { router } from './assets/routes';

function App() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
