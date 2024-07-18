import { useState, useRef, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { cartActions } from "../redux/slices/cartSlice"
import { toast } from "react-toastify"

import { Container, Row, Col } from "reactstrap"
import products from '../assets/data/products'
import Helmet from '../components/Helmet/Helmet' 
import CommonSection from '../components/UI/CommonSection'
import { ProductsList } from '../components/UI/ProductsList'


import './../styles/Product-details.scss'

const ProductDetails = () => {

  const [tab, setTab] = useState('desc');

  const rewiewUser = useRef('')

  const reviewMsg = useRef('')

  const dispatch = useDispatch()

  const [rating, setRating] = useState(null)

  const { id } = useParams();

  const product = products.find((item) => item.id === id);

  const {imgUrl, productName, price, avgRating, reviews, shortDesc, description, category} = product;

  const relatedProducts = products.filter(item=> item.category === category)

  const submitHandler = (e) =>{
    e.preventDefault()

    const rewiewUserName = rewiewUser.current.value
    const reviewUserMasg = reviewMsg.current.value

    
    const reviewObj = {
      userName: rewiewUserName,
      text: reviewUserMasg,
      rating
    }

    console.log(reviewObj)
    toast.success('Review submitted')
  }

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        image: imgUrl,
        productName,
        price,
      })
    );

    toast.success('Product added successfully')
  };

  useEffect(()=>{
    window.scrollTo(0,0);
  }, [product]);

  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg='6'>
              <img src={imgUrl} alt="" />
              
            </Col>
            <Col lg='6'>
              <div className="product__details">
                <h2>{productName}</h2>
                <div className="product__rating d-flex gap-5 mb-3">
                  <div>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-half-s-line"></i>
                    </span>
                  </div>
                  <p>({avgRating}ratings)</p>
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span className="procuct__price">{price} zł</span>
                  <span>Categoty: {category.toUpperCase()}</span>
                </div>
           
                <p className="mb-3">{shortDesc}</p>
                <button onClick={addToCart} className="buy__btn">Add to Cart</button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6 className={`${tab==='desc' ? 'active__tab' : ''}`} onClick={()=> setTab('desc')}>Description</h6>
                <h6 className={`${tab==='rev' ? 'active__tab' : ''}`} onClick={()=> setTab('rev')}>Rewiews ({reviews.length})</h6>
              </div>
              {tab === 'desc' ? (
                <div className="tab__content mt-4">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product__review">
                  <div className="review__wrapper">
                    <ul>
                      {reviews?.map((item, index)=>(
                        <li key={index}>
                          <h6>xxx xxx</h6>
                          <span>{item.rating} (rating)</span>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="review__form">
                      <h4>Leave you experience</h4>
                      <form action="" onSubmit={submitHandler}>
                        <div className="form__group">
                          <input type="text" ref={rewiewUser} placeholder="Enter name" />
                        </div>
                        <div className="form__group d-flex align-items-center gap-5">
                          <span onClick={()=> setRating(1)}>1 <i className="ri-star-s-fill"></i></span>
                          <span onClick={()=> setRating(2)}>2 <i className="ri-star-s-fill"></i></span>
                          <span onClick={()=> setRating(3)}>3 <i className="ri-star-s-fill"></i></span>
                          <span onClick={()=> setRating(4)}>4 <i className="ri-star-s-fill"></i></span>
                          <span onClick={()=> setRating(5)}>5 <i className="ri-star-s-fill"></i></span>
                        </div>
                        <div className="form__group">
                          <textarea rows={4} type="text" ref={reviewMsg} placeholder="Review Message" />
                        </div>
                        <button type="submit" className="buy__btn">Submit</button>
                      </form>
                    </div>

                  </div>
                </div>
              )}

              
            </Col>

            <Col lg='12'>
              <h2 className="related__title">You might also like</h2>
            </Col>
            <ProductsList data={relatedProducts} />
          </Row>
        </Container>
      </section>

    </Helmet>
  )
}

export default ProductDetails