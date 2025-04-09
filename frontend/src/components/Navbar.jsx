import {Link} from 'react-router-dom';
import {useLogout} from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
const Navbar = () => {
    const {logout} = useLogout();
    const {user}   = useAuthContext();
    const handleLogout = () => {
        logout();
    }

    return (
      <nav className="flex justify-between items-center bg-[#f8e2a5] p-4 shadow-md">
        <h1 className="text-2xl font-bold text-[#3b2f2f]">Bookstore</h1>
        <div className="flex items-center space-x-4">
          {
            user && (
                <>
                    <span className="text-[#3b2f2f] font-semibold">{user.user.name}</span>
                    <Link to='/cart' className="px-4 py-2 bg-[#8b5a2b] text-white rounded-lg hover:bg-[#6d4522] cursor-pointer">Cart</Link>
                    <button onClick={handleLogout} className="px-4 py-2 bg-[#8b5a2b] text-white rounded-lg hover:bg-[#6d4522]">Logout</button>
                </>
            )
          }  
          
          {
            !user && (
                <>
                    <Link to='/login' className="px-4 py-2 bg-[#8b5a2b] text-white rounded-lg hover:bg-[#6d4522]">Login</Link>
                    <Link to='/signup' className="px-4 py-2 bg-[#8b5a2b] text-white rounded-lg hover:bg-[#6d4522]">Signup</Link>
                </>
            )
          }

        </div>
      </nav>
    );
};
export default Navbar;