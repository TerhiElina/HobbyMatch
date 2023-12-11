import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Happenings from './Happenings.jsx';
import Home from './Home.jsx';
import Users from './Users.jsx';
import Associations from './Associations.jsx';
import HappeningByAssociation from './components/HappeningByAssociation.jsx';

const router = createBrowserRouter([ // Import components that are used in routes
{
path: "/",
element: <App />,
children: [ // children are nested routes with a route
{
element: <Home />,
index: true // index route does not need any path
},
{
path: "Happenings", // path can be defined relative to the parent path
element: <Happenings />,
},
{
path: "Users",
element: <Users />,
},
{
  path: "Associations",
  element: <Associations />,
  },
  {
    path: "/groups/:associationid",
    element: <HappeningByAssociation />,
  },
]
}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>,
  );
