import './App.css';
import HomePage from './pages/homepage.component';

import { Switch, Route } from 'react-router-dom';

const HatsPage = () => (
  <div>
    <h1>
      namma
    </h1>
  </div>
)


function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/Hats' component={HatsPage} />
      </Switch>
    </div>
  );
}

export default App;
