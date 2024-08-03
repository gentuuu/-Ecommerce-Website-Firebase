import {useState, useEffect} from "react"

import Helmet from "../components/Helmet/Helmet"
import '../styles/Home.scss'

import {Link } from 'react-router-dom'
import {Container, Row, Col} from 'reactstrap'

import heroImg from '../assets/images/hero-img.png'
import counterImg from '../assets/images/counter-timer-img.png'
import products from '../assets/data/products'

import Services from "../services/Services"
import { ProductsList } from "../components/UI/ProductsList"
import Clock from "../components/UI/Clock"

import useGetData from "../custom-hooks/useGetData"

const Home = () => {

  const year = new Date().getFullYear();

  const {data: products, loading} = useGetData('products')

  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(()=>{
    const filteredTrendingProducts = products.filter(
      (item) => item.category === 'chair'
    );

    const filteredBestSalesProducts = products.filter(
      (item) => item.category === 'sofa'
    );

    const filteredMobileProducts = products.filter(
      (item) => item.category === 'mobile'
    );

    const filteredWirelessProducts = products.filter(
      (item) => item.category === 'wireless'
    );

    const filteredPopularProducts = products.filter(
      (item) => item.category === 'watch'
    );

    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
    setMobileProducts(filteredMobileProducts);
    setWirelessProducts(filteredWirelessProducts);
    setPopularProducts(filteredPopularProducts);
  },[products]);


  return (
    <Helmet title={'Home'}>

      <section className="hero__section">
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className="hero__content">
                <p className="hero__subtitle">Trending product in {year}</p>
                <h2>Lorem ipsum dolor sit</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea suscipit repudiandae omnis fugiat at corrupti unde nemo repellendus eaque! Expedita excepturi explicabo odit officiis repudiandae eligendi reiciendis veritatis praesentium natus.
                Quae, asperiores! Animi nesciunt, doloribus asperiores nemo id laboriosam? Tempora dolore eveniet doloribus sunt facilis possimus beatae distinctio sit molestias quibusdam, earum vero porro deserunt repudiandae totam asperiores quaerat quia?
                </p>
                <button className="buy__btn"><Link to='/shop'>SHOP NOW</Link></button>
              </div>
            </Col>
            <Col lg='6' md='6'>
              <div className="hero__img">
                <img src={heroImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Services/>

      <section className="trending__product">
        <Container>
          <Row>
            <Col lg='12' className="text-center">
              <h2 className="section__title">Trending Product</h2>
            </Col>
            {loading ? (
              <h5 className="fw-bold">Loading....</h5>
            ): (
              <ProductsList data={trendingProducts} />
            )}

          </Row>
        </Container>
      </section>

      <section className="best__sales">
        <Container>
          <Row>
            <Col lg='12' className="text-center">
              <h2 className="section__title">Best Sales</h2>
            </Col>
            {loading ? (
              <h5 className="fw-bold">Loading....</h5>
            ): (
              <ProductsList data={bestSalesProducts} />
            )}
           
          </Row>
        </Container>
      </section>

      <section className="timer__count">
        <Container>
          <Row>
            <Col lg='6' md='12'>
              <div className="clock__top-content">
                <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
                <h3 className="text-white fs-5 mb-3">Quality ArmChair</h3>
              </div>
              <Clock />
              <button className="buy__btn store__btn">
                <Link to='/shop'>Visit Store</Link>
              </button>
            </Col>
            <Col lg='6' md='12' className="text-end counter__img">
              <img src={counterImg} alt="" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg='12' className="text-center mb-5">
              <h2 className="section__title">New Arrivals</h2>
            </Col>
            {loading ? (
              <h5 className="fw-bold">Loading....</h5>
            ): (
              <ProductsList data={mobileProducts} />
            )}
            {loading ? (
              <h5 className="fw-bold">Loading....</h5>
            ): (
              <ProductsList data={wirelessProducts} />
            )}
            
          </Row>
        </Container>
      </section>

      <section className="popular__category">
        <Container>
          <Row>
            <Col lg='12' className="text-center mb-5">
              <h2 className="section__title">Popular in Category</h2>
            </Col>
            {loading ? (
              <h5 className="fw-bold">Loading....</h5>
            ): (
              <ProductsList data={popularProducts} />
            )}
    
          </Row>
        </Container>
      </section>

    </Helmet>
  )
}

export default Home