import {FC} from 'react'
import logo from '../../Assets/Images/logo.png'
const EmailChecker:FC = () => {
  return (
    <div className='bg-white absolute z-10 w-screen h-screen overflow-hidden flex flex-col justify-center items-center gap-7'>
        <img src={logo} alt="ecommerce360" />
        <p className='font-semibold text-black text-center text-lg'>Email sent to your account. Check your account inbox</p>
    </div>
  )
}

export default EmailChecker