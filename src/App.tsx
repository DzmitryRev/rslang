import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/about">{/* <About /> */}</Route>
        <Route path="/users">{/* <Users /> */}</Route>
        <Route path="/">{/* <Home /> */}</Route>
      </Switch>
    </div>
  );
}

export default App;
