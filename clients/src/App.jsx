import {ProductList} from "./pages/ProductList"
import Home from "./pages/Home"
import Product from "./pages/Product"
import Register from "./pages/Register"
import {Cart} from "./pages/Cart"
import Login from "./pages/Login"
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom'

const App = () => {
    const user = true
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/products/:category" component={ProductList}/>
                <Route path="/cart" component={Cart}/>
                <Route path="/product/:id" component={Product}/>
                <Route path="/login">
                    {user ? <Redirect path="/"/> : <Login/>}
                    <Login />
                    </Route>
                <Route path="/register">
                    {user ? <Redirect path="/register"/> : <Register/>}
                    <Register />
                </Route>
                <Route exact={true} path="/" component={Home}/>
            </Switch>
        </BrowserRouter>
    )
};

export default App;