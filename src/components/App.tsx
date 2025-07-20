import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import store from '../store/store';
import { SessionGuard } from './SessionGuard';

function App() {
  return (
    <Provider store={store}>
      <div className="max-w-screen-xl mx-auto px-4 py-10 bg-charcoal h-screen text-cream text-lg relative">
        <SessionGuard />
        <Outlet />
        <ToastContainer position="bottom-right" autoClose={3000} />
        {/* <div className="absolute h-full inset-0 z-0 pointer-events-none">
          <img
            src={svgOne}
            className="absolute top-0 left-0 w-40 opacity-20 rotate-12"
            alt="Decor Left Top"
          />
          <img
            src={svgTwo}
            className="absolute bottom-3.5 right-0 w-40 opacity-20 rotate-12"
            alt="Decor Right Bottom"
          />
        </div> */}
      </div>
    </Provider>
  );
}

export default App;
