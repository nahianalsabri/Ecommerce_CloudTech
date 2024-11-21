import React, { useContext, useRef, useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import nav_dropdown from '../Assets/nav_dropdown.png'
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef();
    const toggleMenu = () => {
      setIsMenuOpen((prev) => !prev);
    };
    const handleButtonClick = (param) => {
      setIsMenuOpen(false)
      navigate(param);
    };
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
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
  return (
    <div className='navbar'>
      <Link to='/' onClick={()=>{setMenu("shop")}} className="nav-logo">
        <img src={logo} alt="" />
        <p>Cloud Tech Student Store </p>
      </Link>
      <img onClick={dropdown_toggle} className='nav-dropdown' src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}><Link to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("mens")}}><Link to='/mens'>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("womens")}}><Link to="womens">Women</Link>{menu==="womens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("kids")}}><Link to='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
      </ul>
      <div ref={dropdownRef} className="nav-login-menu">
          <button onClick={toggleMenu} className='nav-login-menu-button'>LogIn & SignUp</button>
          {isMenuOpen && (
            <div className="nav-login-menu-sub">
              <button onClick={() => handleButtonClick('/login_customer')} className='nav-login-item'>
                Customers
              </button>
              <button onClick={() => handleButtonClick('/login_seller')} className='nav-login-item'>
                Sellers
              </button>
            </div>
          )}
      </div>
      <div className="nav-login-cart">
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar
