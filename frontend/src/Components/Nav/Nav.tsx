import { FC } from 'react';
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

interface NavProps {
  logIn: () => void,
  selectionMenu: () => void;
}

const Nav:FC<NavProps> = ({logIn, selectionMenu}) => {

  const { user, isAuthenticated } = useAuth0();


  return (
    <nav style={{height: "12vh"}} className='sticky top-0 navbar bg-black flex justify-between items-center text-xs lg:text-sm text-black'>
        <button className='button font-semibold bg-white rounded-full h-6 lg:h-8 w-24 lg:w-32 flex justify-center items-center ml-9'>
            eWebShop
        </button>
        { !isAuthenticated ?
        <button className='button font-semibold bg-white rounded-full h-6 lg:h-8 w-24 lg:w-32 flex justify-center items-center mr-9'
          onClick={logIn}
        >
            Log in
        </button> :
        <>
        <Link to='/cart' className='hidden md:flex button font-semibold bg-white rounded-full h-6 lg:h-8 w-24 lg:w-32 justify-center items-center mr-9'>
          <div className='relative -top-3 -left-8 px-3 py-1 rounded-full bg-red-600'>1</div>
           Cart
        </Link>
        <button className='md:hidden button font-semibold bg-white rounded-full h-6 lg:h-8 w-24 lg:w-32 flex justify-center items-center gap-1 mr-9'
        onClick={selectionMenu}>
          <p>Menu</p>
          <i className='fa fa-bars text-white'></i>
        </button>
        </>}
    </nav>
  );
};

export default Nav;
