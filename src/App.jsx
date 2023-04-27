import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { Button, Col, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faTumblr } from '@fortawesome/free-brands-svg-icons'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons'

function MainCard({ children }) {
  const cardClasses = 'justify-content-center m-2 m-sm-auto bg-light p-3 rounded'
  return (
    <Col md={10} lg={8} xl={6} id='quote-box' className={cardClasses} >
      {children}
    </Col>
  )
}

function Quote() {
  const quoteClasses = "fs-3 fw-bold text-center mb-2"
  return (
    <div id="text" className={quoteClasses}>
      <FontAwesomeIcon icon={faQuoteLeft}/>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eros neque, rutrum vel nisi consectetur, hendrerit feugiat velit.
      <FontAwesomeIcon icon={faQuoteRight}/>
    </div>
  )
}

function Author() {
  return (
    <div id='author' className='text-end mb-3'>- Author</div>
  )
}

const getQuote = () => {
  let author = ""
  let quote = ""
  fetch("https://zenquotes.io/api/random")
    .then(response => response.text())
    .then(quoteList => {
      console.log(quoteList)
      quote = quoteList[0].q
      author = quoteList[0].a
      console.log(`quote= ${quote} author= ${author}`)
      return [quote, author]
    })
    .catch((err) => {
      console.log(err)
    })
    return ["", ""]
}

function Buttons() {
  const displayClasses = 'd-flex text-center align-items-center'
  return (
    <div id="socialButtons" className={displayClasses}>
      <div id="socialButtons" className='d-flex gap-3'>
        <div className='btn btn-primary'>
          <a id='tweet-quote' role='button'>
            <FontAwesomeIcon icon={faTwitter} fixedWidth />
          </a>
        </div>
        <div className='btn btn-primary'>
          <a id='tumblr-quote' role='button'>
            <FontAwesomeIcon icon={faTumblr} fixedWidth />
          </a>
        </div>
      </div>
      <div className='ms-auto'>
        <Button id='new-quote' onClick={getQuote}>New Quote</Button>
      </div>
    </div>
  )
}

function App() {
  return (
    <div id='background' className='d-flex align-items-center min-vw-100 min-vh-100'>
      <Container>
        <MainCard>
          <Quote />
          <Author />
          <Buttons />
        </MainCard>
        <div id="me" className="mt-4 text-center">by <a href="https://github.com/stixbunny" target="_blank" rel="noreferrer">stixbunny</a></div>
        <div id="credit" className="mt-3 text-center">Inspirational quotes provided by <a href="https://zenquotes.io/" target="_blank" rel="noreferrer">ZenQuotes API</a></div>
      </Container>
    </div>
  )
}

/* function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
} */

export default App
