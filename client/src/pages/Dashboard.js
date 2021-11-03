import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Navbar } from '../components/base';
import { Customer, Order } from '.';
import { Switch,Redirect, Route } from 'react-router-dom';

function Dashboard() {
  const history = useHistory();
  const user = localStorage.getItem('user');

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [user]);
  return (
    <div>
      <Navbar />
      <div className="pt-5 min-vh-100">

      <Switch>
      <Redirect exact from="/" to="/order" />
        <Route path='/order' component={Order} />
        <Route path='/customer' component={Customer} />
      </Switch>
      </div>

    </div>
  );
}

export default Dashboard;
