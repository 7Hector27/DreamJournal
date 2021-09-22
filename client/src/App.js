import React from 'react';
import NavbarComponent from './layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import LandingPage from './layout/LandingPage';
import Home from './layout/Home';
const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <div>
            <NavbarComponent />
            <Container>
              <Route exact path='/home' component={Home} />
              <Route exact path='/landingPage' component={LandingPage} />
            </Container>
          </div>
          <Route></Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
