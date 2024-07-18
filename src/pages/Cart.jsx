import '../styles/Cart.scss'
import Helmet from '../components/Helmet/Helmet'
import CommonSecttion from '../components/UI/CommonSection'
import { Container, Row, Col } from 'reactstrap'

import { cartActions } from '../redux/slices/cartSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Cart = () => {

  const cartItems = useSelector((state)=> state.cart.cartItems);

  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <Helmet title='Cart'>
      <CommonSecttion title='Shopping Cart' />
      <section>
        <Container>
          <Row>
            <Col lg='9'>
              {
                cartItems.length === 0 ? (
                <h2 className='fs-4 text-center'>No item added to the cart</h2>
                ) : (
                <table className='table bordered'>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) =>(
                     <Tr item={item} key={index} /> 
                    ))}
                  </tbody>
                </table>
                )
              }
            
            </Col>

            <Col lg='3'>
              <div>
                <h6>Subtotal</h6>
                <span>{totalAmount}</span>
              </div>
              <p>taxes and shipping will calculate in checkout</p>
              <div>
                <button className="buy__btn">
                  <Link to='/shop'>Continue Shopping</Link>
                </button>
                <button className="buy__btn">
                  <Link to='/checkout'>Checkout</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

const Tr = ({item}) =>{

  const dispatch = useDispatch()

  const deleteProduct = () =>{
    dispatch(cartActions.deleteItem(item.id))
  }

  return (
    <tr>
      <td><img src={item.imgUrl} alt="" /></td>
        <td>{item.productName}</td>
        <td>{item.price} zł</td>
        <td>{item.quantity}</td>
        <td><i onClick={deleteProduct} className='ri-delete-bin-line'></i></td>
    </tr>
  )
}

export default Cart