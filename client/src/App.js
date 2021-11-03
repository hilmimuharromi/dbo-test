import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import {  Login, Dashboard } from './pages';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

  return (
    <Router>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route  path='/' component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
