import React from "react"
import { Link } from "gatsby"
import Bio from "../components/bio"
import "./layout.css"
import useDarkMode from "use-dark-mode"
import Switch from "react-switch"
import { rhythm, scale } from "../utils/typography"
import sunIcon from "../assets/sun-icon.svg"
import moonIcon from "../assets/moon-icon.svg"
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { IconContext } from "react-icons";

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

const Layout = ({ location, title, children, pageWidth }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header
  let headerWrapper
  let footer

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
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
        <Bio location={location} />
        <div
        style ={{
          display: 'flex',
          justifyContent: 'center',
        }}
        >
          <IconContext.Provider value={{ size: '2em', style: { textDecoration: 'none' } }}>
            <div style={{ textDecoration: 'none' }}>
              <a style={{ marginRight: '2em', textDecoration: 'none' }} href='https://github.com/garethiv' target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              <a style={{ marginRight: '2em', textDecoration: 'none' }} href='https://www.linkedin.com/in/garethveale/' target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
              <a style={{ marginRight: '2em', textDecoration: 'none' }} href='https://twitter.com/garethveale' target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            </div>
          </IconContext.Provider>
        </div>
        <div
        style ={{
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
            textDecoration: `none`,
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
        style ={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: location.pathname.includes('posts') || location.pathname.includes('tags') ? '4em' : '0em'
        }}
      >
        <IconContext.Provider value={{ size: '2em', style: { textDecoration: 'none' } }}>
          <div style={{ textDecoration: 'none' }}>
            <a style={{ marginRight: '2em', textDecoration: 'none' }} href='https://github.com/garethiv' target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            <a style={{ marginRight: '2em', textDecoration: 'none' }} href='https://www.linkedin.com/in/garethveale/' target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            <a style={{ marginRight: '2em', textDecoration: 'none' }} href='https://twitter.com/garethveale' target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
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
        maxWidth: pageWidth ? rhythm(pageWidth) : rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      {headerWrapper}
      <main>{children}</main>
      <footer>
        {footer}
      </footer>
    </div>
  )
}

export default Layout
