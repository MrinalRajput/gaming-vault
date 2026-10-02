import {Link} from 'react-router-dom' 

import '../css/Navbar.css'
function Navbar() {
  return (
    <div className="navbar">
      <div className="left-nav">
        <h1>Gaming<span style={{color:'#b41928'}}>V</span>ault</h1>
      </div>
        <div className="right-nav">
            <Link to="/">Home</Link>
            <Link to="/favourite">Favourite</Link>
            <Link to="/contact">Contact</Link>
        </div>
    </div>
  );
}

export default Navbar;
