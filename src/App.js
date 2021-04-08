import { Redirect, Route, Switch } from 'react-router';
import './App.css';
import Header from './components/Header';
import Home from './features/Home';
import Login from './features/Login';
import Register from './features/Register';

function App() {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Redirect from="/home" to="/"></Redirect>
        <Route path="/" exact component={Home}></Route>

        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
      </Switch>
    </div>
  );
}

export default App;
