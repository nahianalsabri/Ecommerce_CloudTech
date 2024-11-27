import React, { useContext, useRef, useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import nav_dropdown from '../Assets/nav_dropdown.png'
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import { getUser, logout } from '../Registration/user'

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [search, setSearch] = useState("")
    const dropdownRef = useRef();
    const toggleMenu = () => {
      setIsMenuOpen((prev) => !prev);
    };
    const handleButtonClick = (param) => {
      setIsMenuOpen(false);
      navigate(param);
    };
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    const handleChange = (event) => {
      const value = event.target.value;
      setSearch(value);
    }
    useEffect(() => {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, []);

    const [menu,setMenu] = useState("shop");
    const {getTotalCartItems}= useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
      menuRef.current.classList.toggle('nav-menu-visible');
      e.target.classList.toggle('open');
    }
    const LogOut = () => {
      logout();
      navigate("/"); 
      setIsMenuOpen(false);
    }
  return (
    <div className='navbar'>
      <Link to='/' onClick={()=>{setMenu("shop")}} className="nav-logo">
        <img src={logo} alt="" />
        <p>Cloud Tech Student Store </p>
      </Link>
      <img onClick={dropdown_toggle} className='nav-dropdown' src={nav_dropdown} alt="" />
      {(!getUser().userLogin || 
      (getUser().userLogin && getUser().userRole === "Customer")) && (
        <ul ref={menuRef} className="nav-menu">
          <li onClick={()=>{setMenu("shop")}}><Link to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("mens")}}><Link to='/mens'>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("womens")}}><Link to="womens">Women</Link>{menu==="womens"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("kids")}}><Link to='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
        </ul>
      )}
      {(getUser().userLogin && getUser().userRole === "Customer") && (
        <div className='nav-search'>
            <input type="text" value={search} onChange={(event) => handleChange(event)} placeholder='Search Here'/>
            <button>Search</button>
        </div>
      )}
      {(getUser().userLogin && getUser().userRole === "Customer") && (
        <div className="nav-login-cart">
          <Link to='/cart'><img src={cart_icon} alt="" /></Link>
          <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
      )}
      <div ref={dropdownRef} className="nav-login-menu">
          {!getUser().userLogin && 
            (<button onClick={toggleMenu} className='nav-login-menu-button'>LogIn & SignUp</button>
          )}
          {getUser().userLogin && 
            (<button onClick={toggleMenu} className='nav-login-menu-button'>{getUser().userName}</button>
          )}
          {(isMenuOpen && !getUser().userLogin) && (
            <div className="nav-login-menu-sub">
              <button onClick={() => handleButtonClick('/login_user')} className='nav-login-item'>
                Customers
              </button>
              <button onClick={() => handleButtonClick('/login_seller')} className='nav-login-item'>
                Sellers
              </button>
            </div>
          )}
          {(isMenuOpen && getUser().userLogin && getUser().userRole === "Customer") && (
            <div className="nav-login-menu-sub">
              <button onClick={() => handleButtonClick('/OrderManagement')} className='nav-login-item'>
                Order Management
              </button>
              <button onClick={() => {LogOut()}} className='nav-login-item'>
                Log Out
              </button>
            </div>
          )}
          {(isMenuOpen && getUser().userLogin && getUser().userRole === "Seller") && (
            <div className="nav-login-menu-sub">
              <button onClick={() => handleButtonClick('/AddProduct')} className='nav-login-item'>
                Dashboard
              </button>
              <button onClick={() => {LogOut()}} className='nav-login-item'>
                Log Out
              </button>
            </div>
          )}
      </div>
    </div>
  )
}

export default Navbar
