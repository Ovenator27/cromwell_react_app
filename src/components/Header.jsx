import { Link } from "react-router-dom"

export default function Header() {
  return (
    <nav>
        <ul className='menu'>
            <li>
                <Link to={'/'}>
                <img src='cromwell_logo.png' id='logo'/>
                </Link>
                </li>
            <li >
                <Link to={'Account'} className='link'>
                My Account<br/>
                Log in / Register
                </Link>
                </li>
        </ul>
    </nav>
  )
}
