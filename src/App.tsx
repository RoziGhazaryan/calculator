import React from 'react';
import { Switch, Route } from 'react-router';
import Calculator from "./pages/calculator";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/calculator'
               exact
               component={Calculator}
               key='1'
        />
        <Link to="/calculator">Calculator</Link>
      </Switch>
    </div>
  );
}

export default App;
