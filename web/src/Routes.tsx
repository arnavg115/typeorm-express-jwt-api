import { FC } from "react"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Link } from 'react-router-dom'



export const Routes:FC =()=>{


  return <div>
    <BrowserRouter>
    <div>
      <header>
      <div><Link to="/register">register</Link></div>
      <div><Link to="/login">login</Link></div>
      <div><Link to="/">Home</Link></div>
      </header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
      </div>
    </BrowserRouter>
  </div>
}


