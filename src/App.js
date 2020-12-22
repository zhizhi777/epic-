import React, { Suspense } from "react";
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import { 
  Switch,
  Route
 } from "react-router-dom";

const Home = React.lazy(()=>import('./pages/Home'));
const History = React.lazy(()=>import('./pages/History'));
const About = React.lazy(()=>import('./pages/About'));
const Login = React.lazy(()=>import('./pages/Login'));
const Register = React.lazy(()=>import('./pages/Register'));




function App() {
  return (
    <>
     <Header />

     <main>
     <Suspense fallback={ <Loading /> }>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/history' component={History} />
        <Route path='/about' component={About} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </Switch>
     </Suspense>
     </main>

     <Footer />
    </>
  );
}

export default App;
