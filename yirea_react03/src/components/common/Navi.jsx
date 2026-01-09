import { Link, useNavigate } from 'react-router-dom'

function Nav() {
    const nav = useNavigate()
    
    const onClickButton = () => {
      nav('/userlist')
      // window.location.href = '/userlist'
      // history.pushState(null, null, '/userlist')
      // window.dispatchEvent(new PopStateEvent('popstate'))
    }

  return (
    <nav>
      {/* <nav>
        <a href="/"> [ Home ] </a> |{' '}
        <a href="/userlist"> [ User List ] </a> |{' '}
        <a href="/viewer"> [ Viewer ] </a> |{' '}
        <a href="/timer"> [ Timer ] </a>
      </nav> */}
      <Link to="/" style={{ textDecoration: 'none' }}> [ Home ] </Link>
      <Link to="/userlist" style={{ textDecoration: 'none' }}> [ User List ] </Link>
      <Link to="/viewer" style={{ textDecoration: 'none' }}> [ Viewer ] </Link>
      <Link to="/timer" style={{ textDecoration: 'none' }}> [ Timer ] </Link>
      <button onClick={onClickButton}> [ User List ] </button>
      <Link to={"/simplecounter"} style={{ textDecoration: 'none' }}> [ Simple Counter ] </Link>
    </nav>
  )
}

export default Nav

