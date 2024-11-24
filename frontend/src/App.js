
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Login from './Pages/LoginSignup/Login';
import Signup from './Pages/LoginSignup/Signup';
import LoginSeller from './Pages/LoginSignup/LoginSeller';
import SignupSeller from './Pages/LoginSignup/SignupSeller';
import Forgetpassword from './Pages/LoginSignup/Forgetpassword';
import Resetpassword from './Pages/LoginSignup/Resetpassword';
import AddProduct from './Pages/LoginSignup/AddProduct';
import ProductInformation from './Pages/LoginSignup/ProductInformation';
import Footer from './Components/Footer/Footer';
import Test from './Pages/test'
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/>}/>
        <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"/>}/>
        <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid"/>}/>
        <Route path="/product" element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/signup_customer' element={<Signup/>}/>
        <Route path='/login_customer' element={<Login/>}/>
        <Route path='/signup_seller' element={<SignupSeller/>}/>
        <Route path='/login_seller' element={<LoginSeller/>}/>
        <Route path='/forgetPWD' element={<Forgetpassword/>}>
          <Route path=':role' element={<Forgetpassword/>}/>
        </Route>
        <Route path='/resetPWD' element={<Resetpassword/>}>
          <Route path=':role' element={<Resetpassword/>}/>
        </Route>
        <Route path='/AddProduct' element={<AddProduct/>}/>
        <Route path='/ProductInformation' element={<ProductInformation/>}/>
        <Route path='/test' element={<Test/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
