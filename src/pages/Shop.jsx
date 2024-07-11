import { useState } from "react"

import CommonSection from "../components/UI/CommonSection"
import Helmet from '../components/Helmet/Helmet'
import { ProductsList } from "../components/UI/ProductsList"

import { Col, Container, Row } from "reactstrap"

import products from '../assets/data/products'

import './../styles/Shop.scss'

const Shop = () => {

  const [productsData, setProductsData] = useState(products);

  const handleFilter = (e) =>{
    const filterValue = e.target.value;
    if (filterValue === 'sofa'){
      const filterProducts = products.filter(
        (item) => item.category === 'sofa'
      );

      setProductsData(filterProducts);
    }

    if (filterValue === 'mobile'){
      const filterProducts = products.filter(
        (item) => item.category === 'mobile'
      );

      setProductsData(filterProducts);
    }

    if (filterValue === 'chair'){
      const filterProducts = products.filter(
        (item) => item.category === 'chair'
      );

      setProductsData(filterProducts);
    }

    if (filterValue === 'watch'){
      const filterProducts = products.filter(
        (item) => item.category === 'watch'
      );

      setProductsData(filterProducts);
    }

    if (filterValue === 'wireless'){
      const filterProducts = products.filter(
        (item) => item.category === 'wireless'
      );

      setProductsData(filterProducts);
    }
  }

  return (
    <Helmet title='Shop'>
      <CommonSection title='Products' />
      <section>
        <Container>
          <Row>
            <Col lg='3' md='3'>
              <div className="filter__widget">
                <select onChange={handleFilter}>
                  <option>Filter by category</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div>
            </Col>
            <Col lg='3' md='3'>
              <div className="filter__widget">
                <select>
                  <option>Sort by</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg='6' md='6'>
              <div className="search__box">
                <input type="text" placeholder="Search ....." />
                <span><i className="ri-search-line"></i></span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            {productsData.length === 0 ? (
              <h1>No products are foind!</h1>
            ) : (
              <ProductsList data={productsData} />
            )}
          </Row>
        </Container>
      </section>

    </Helmet>
  )
}

export default Shop