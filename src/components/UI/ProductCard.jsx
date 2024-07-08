/* eslint-disable react/prop-types */
import '../../styles/Product-card.scss'

import { Col } from 'reactstrap'
import { Link } from 'react-router-dom'

const ProductCard = ({item}) => {
  return (
    <Col lg='3' md='4' className='mb-2'>
        <div className="product__item">
            <div className="product__img">
                <img src={item.imgUrl} alt="" />
            </div>
            <div className='p-2 product__info'>
                <h3 className="product__name">
                    <Link to={`/shop/${item.id}`}>{item.productName}</Link>
                </h3>
                <span>{item.categoty}</span>
            </div>
            <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
                <span className="price">{item.price} zł</span>
                <span>
                    <i className='ri-add-line'></i>
                </span>
            </div>
        </div>
    </Col>
  )
}

export default ProductCard