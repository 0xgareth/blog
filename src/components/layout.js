import React from "react"
import { Link } from "gatsby"
import Bio from "./bio"
import "./layout.css"
import { IconContext } from "react-icons"
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { rhythm, scale } from "../utils/typography"
import useDarkMode from "use-dark-mode"
import Switch from "react-switch"
import sunIcon from "../../content/assets/sun-icon.svg"
import moonIcon from "../../content/assets/moon-icon.svg"

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false)

  return (
    <Switch 
      onChange={darkMode.toggle}
      checked={darkMode.value}
      onColor="#222"
      offColor="#333"
      checkedIcon={<img src={moonIcon} alt="moon icon" />}
      uncheckedIcon={<img src={sunIcon} alt="sun icon" />}
      boxShadow="0 0 2px 2px grey"
      activeBoxShadow="0 0 2px 2px grey"
    />
  )
}

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header
  let footer
  let headerWrapper

  if (location.pathname === rootPath) {
    header = (
      <div>
        <h1
          style={{
            ...scale(1),
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
        <Bio location={location} />
        <div
          style={{
            display: 'flex',
            justifyContent:'space-between',
          }}
        >
          <Link to={`/posts`}>Notes →</Link>

          <Link to={`/books`}>← Books</Link>
        </div>
        <br/>
        <br/>
        <div
          style={{
            display: 'flex',
            justifyContent:'center',
          }}
        >
          <IconContext.Provider value={{ size: '2em', style: { textDecoration: 'none' } }}>
            <div>
              <a style={{ marginRight: '2em', textDecoration: 'None' }} href="https://github.com/garethiv" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              <a style={{ marginRight: '2em', textDecoration: 'None' }} href="https://www.linkedin.com/in/garethveale/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
              <a style={{ marginRight: '2em', textDecoration: 'None' }} href="https://twitter.com/home" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            </div>
          </IconContext.Provider>
          </div>
          
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '2em',
              marginRight: '2em'
            }}
          >
            <DarkModeToggle />
          
        </div>
      </div>
    )
    headerWrapper = (
      <header style={{ 
        flexDirection: 'column', 
        display: 'flex', 
        marginBottom: rhythm(1.5),
        marginTop: '50%',
        alignItems: 'center',
        justifyContent: 'center',}}
      >
        {header}
      </header>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
    headerWrapper = (
      <header style={{ 
        flexDirection: 'row', 
        display: 'flex',
        justifyContent: 'space-between' }}
      >
        {header}
        <DarkModeToggle />
      </header>
    )
    footer = (
      <div
        style={{
          display: 'flex',
          justifyContent:'center',
          marginTop: location.pathname.includes('posts') ? '4em' : '0em'
        }}
      >
        <IconContext.Provider value={{ size: '2em', style: { textDecoration: 'none' } }}>
          <div>
            <a style={{ marginRight: '2em', textDecoration: 'None' }} href="https://github.com/garethiv" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            <a style={{ marginRight: '2em', textDecoration: 'None' }} href="https://www.linkedin.com/in/garethveale/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            <a style={{ marginRight: '2em', textDecoration: 'None' }} href="https://twitter.com/home" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          </div>
        </IconContext.Provider>
      </div>
    )
  }
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{headerWrapper}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
    </div>
  )
}

export default Layout
