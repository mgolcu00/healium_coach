import React from 'react';
import { Switch ,Route} from 'react-router-dom';
import Login from '../features/login/Login';
import Home from '../features/home/Home';
import Session from '../features/session/Session';
import { ChakraProvider } from "@chakra-ui/react"
import PrivateRoute from '../components/private_route/PrivateRoute';
import PublicRoute from '../components/public_route/PublicRoute';

const NotFound = () => {
  return (
    <h1>404 Not Found</h1>
  );
}


function App() {
  return (
    <ChakraProvider>
      <Switch>
        <PublicRoute restricted={true} path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/session/:id" component={Session} />
        <Route component={NotFound} />
      </Switch>
    </ChakraProvider>
  );
}

export default App;
