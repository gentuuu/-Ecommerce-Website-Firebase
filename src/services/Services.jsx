import './Services.scss'

import {Container, Row, Col} from 'reactstrap'

import serviceData from '../assets/data/serviceData'


const Services = () => {
  return (
    <section className="services">
        <Container>
            <Row>
                {
                    serviceData.map((item, index) =>(
                        <Col key={index} lg='3' md='4'>
                            <div  className="service__item" style={{background: `${item.bg}`}}>
                                <span>
                                    <i className={item.icon}></i>
                                </span>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.subtitle}</p>
                                </div>
                            </div>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    </section>
  )
}

export default Services