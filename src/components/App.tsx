import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import store from '../store/store';
import { SessionGuard } from './SessionGuard';

function App() {
  return (
    <Provider store={store}>
      <div className="max-w-screen-xl mx-auto px-4 py-10 bg-charcoal text-cream text-lg relative">
        <SessionGuard />
        <Outlet />
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </Provider>
  );
}

export default App;
