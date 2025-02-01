import React from 'react'
import Home from './Components/Home';
import Signup from './Components/SignUp'; 
import Prop from './Components/Prop';
import Signin from './Components/SignIn';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoutes from './Components/PrivateRoutes';
import Repre from './Components/Repre';
import PaymentButton from './Components/PaymentButton';
import AddProperty from './Components/AddProperty';
const App = () => {
  return (
    <Router>
      
        <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/payment' element={<PaymentButton/>}/>
        <Route path='/addProperty' element={<AddProperty/>}/>
        

        <Route path='/prop' element={
            
              <Prop/>
           
          } />
        <Route path='/repre' element={
            
              <Repre/>
           
          } />
        
      </Routes>
    </div>
      </Router>
  )
}

export default App
