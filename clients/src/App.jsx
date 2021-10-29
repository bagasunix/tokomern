import {ProductList} from "./pages/ProductList";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Register from "./pages/Register";
import {Cart} from "./pages/Cart";
import Login from "./pages/Login";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <Home />
                </Route>
                <Route path="/product/:category">
                    <ProductList />
                </Route>
                <Route path="/product/:id">
                    <Product />
                </Route>
                <Route path="/cart">
                    <Cart />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </Router>
    )
};

export default App;