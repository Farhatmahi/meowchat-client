import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import routes from './Route/Routes';

function App() {
  return (
    <div className="bg-neutral h-screen w-screen overflow-hidden">
      <RouterProvider router={routes}/>
      <Toaster/>
    </div>
  );
}

export default App;
