import './App.css'
import { Button, Col, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faTumblr } from '@fortawesome/free-brands-svg-icons'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

function MainCard({ children }) {
  const cardClasses = 'justify-content-center m-2 m-sm-auto bg-light p-3 rounded'
  return (
    <Col md={10} lg={8} xl={6} id='quote-box' className={cardClasses} >
      {children}
    </Col>
  )
}

MainCard.propTypes = {
  children: PropTypes.node.isRequired
}

function Quote(props) {
  //useEffect(props.getQuote);
  function Author() {
    return (
      <div id='author' className='text-end mb-3'>- {props.author}</div>
    )
  }
  return (
    <>
      <div id="text" className="fs-3 fw-bold text-center mb-2">
        <FontAwesomeIcon icon={faQuoteLeft}/>
        {props.quote}
        <FontAwesomeIcon icon={faQuoteRight}/>
      </div>
      <Author />
    </>
  )
}

function Buttons(props) {
  const displayClasses = 'd-flex text-center align-items-center'
  const twitterPost = () => {
    const post = `"${props.quote}" - ${props.author}`
    const url = "http://twitter.com/intent/tweet?text=" + post
    window.open(url, '_blank').focus()
  }
  return (
    <div id="socialButtons" className={displayClasses}>
      <div id="socialButtons" className='d-flex gap-3'>
        <div className='btn btn-primary'>
          <a id='tweet-quote' onClick={twitterPost} role='button'>
            <FontAwesomeIcon icon={faTwitter} fixedWidth />
          </a>
        </div>
        <div className='btn btn-primary'>
          <a id='tumblr-quote' role='button' target="_blank" rel='noreferrer' href={`https://www.tumblr.com/widgets/share/tool?shareSource=legacy&canonicalUrl=www.google.cl&posttype=quote&content=${props.quote}&caption=${props.author}&tags=quote,stixbunny&show-via=Random Quote Generator`}>
            <FontAwesomeIcon icon={faTumblr} fixedWidth />
          </a>
        </div>
      </div>
      <div className='ms-auto'>
        <Button id='new-quote' onClick={props.getQuote} >New Quote</Button>
      </div>
    </div>
  )
}

export default function App() {
  const [quote, setQuote] = useState([]);
  const [author, setAuthor] = useState([]);
  function getQuote() {
    fetch('https://api.quotable.io/quotes/random')
      .then(response => response.json())
      .then(quoteList => {
        console.log(quoteList)
        let quoteResult = quoteList[0].content
        let authorResult = quoteList[0].author
        setQuote(quoteResult);
        setAuthor(authorResult);
      })
      .catch((err) => {
        console.log(err)
      })
      const availableColors = ["yellowgreen", "steelblue", "slateblue", "skyblue", "salmon", "plum", "peru", "olive", "mediumseagreen", "lightseagreen", "lightpink", "honeydew", "deeppink", "coral"]
      document.documentElement.style.setProperty('--base', availableColors[Math.floor((Math.random()*availableColors.length))]);
  }
  useEffect(getQuote, [])
  return (
    <div id='background' className='d-flex align-items-center min-vw-100 min-vh-100'>
      <Container>
        <MainCard>
          <Quote quote={quote} author={author} />
          <Buttons getQuote={getQuote} quote={quote} author={author} />
        </MainCard>
        <div id="me" className="mt-4 text-center">by <a href="https://github.com/stixbunny" target="_blank" rel="noreferrer">stixbunny</a></div>
        <div id="credit" className="mt-3 text-center">Random quotes provided by <a href="https://github.com/lukePeavey/quotable" target="_blank" rel="noreferrer">Quotable</a></div>
      </Container>
    </div>
  )
}
