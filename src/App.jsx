import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard'
import taskLoader from './loaders/taskLoader'


const router = createBrowserRouter([
  {path: "/", element: < Home />},
  {path: "/login", element: <Login />},
  {
    path: "/dashboard",
    element: <Dashboard />,
    loader: taskLoader,
  }
]);

function App(){
  return(
    <RouterProvider router= {router}/>
  );
}

export default App;