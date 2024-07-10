import './Footer.scss'

import { Link } from 'react-router-dom'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'


const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg='4' md='6'>
            <div className="logo">
              <div>
                <h1 className='text-white'>Multimart</h1>
              </div>
            </div>
            <p className="footer__text mt-4">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt ex quae cum! Ullam cumque sequi, tempore, et sunt, amet ad consequatur esse odio accusamus dicta ipsum consectetur id sint unde!
            </p>
          </Col>
          <Col lg='3' md='3'>
            <div className="footer__quick-links">
              <h3 className="quick__links-title">Top Categories</h3>
              <ListGroup className='mb-3'>
                <ListGroupItem className='ps-0 border-0 '>
                  <Link to='#'>Mobile Phone</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Modern Sofa</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'> 
                  <Link to='#'>Arm Chair</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Smart Watches</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg='2' md='3'>
            <div className="footer__quick-links">
              <h3 className="quick__links-title">Usefull Links</h3>
              <ListGroup className='mb-3'>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/shop'>Shop</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/cart'>Cart</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'> 
                  <Link to='/login'>Login</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Privacy Policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg='3' md='3'>
            <div className="footer__quick-links">
              <h3 className="quick__links-title">Contact</h3>
              <ListGroup className='mb-3'>
                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                  <span>
                    <i className='ri-map-pin-line'></i>
                  </span>
                  <p>132 test Sydnay, USA</p>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                  <span>
                    <i className='ri-phone-line'></i>
                  </span>
                  <p>+789789789</p>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'> 
                  <span>
                    <i className='ri-mail-line'></i>
                  </span>
                  <p>test@test.com</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg='12'>
            <p className="footer__copyright">Copyright2024</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer