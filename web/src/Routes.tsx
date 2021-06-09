import { FC } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Bye } from "./pages/Bye";
import Header from "./Header";

export const Routes: FC = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/bye" component={Bye} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};
