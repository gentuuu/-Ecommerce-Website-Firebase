import { Container, Row, Col, Form, FormGroup } from "reactstrap"
import { useState } from "react"
import { toast } from "react-toastify"
import { db, storage } from '../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { collection, addDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

const AddProducts = () => {

  const [enterTitle, setEneterTitle] = useState('');
  const [enterShortDescription, setEnterShortDescription] = useState('');
  const [enterDescription, setEneterDescription] = useState('');
  const [enterCategory, setEneterCategory] = useState('');
  const [enterPrice, setEneterPrice] = useState('');
  const [enterProductImg, setEneterProductImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const addProduct = async (e) =>{
    e.preventDefault()
    setLoading(true)
    // const product = {
    //   title: enterTitle,
    //   shortDesc: enterShortDescription,
    //   description: enterDescription,
    //   category: enterCategory,
    //   price: enterPrice,
    //   imgUrl: enterProductImg
    // };
    

    // add product to the firebase database

    try{

      const docRef = collection(db, 'products')

      const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`)

      const uploadTask = uploadBytesResumable(storageRef, enterProductImg)

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          toast.error('images not upliadded!')
          setLoading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(docRef, {
            title: enterTitle,
            shortDesc: enterShortDescription,
            description: enterDescription,
            category: enterCategory,
            price: enterPrice,
            imgUrl: downloadURL,
          });
          toast.success('Product successfully added!')
          navigate('/dashboard/all-products')
          setLoading(false);
        }
      );
   
    } catch (err) {
      toast.error('Product not added!');
      setLoading(false);
    }

  

    // console.log(product)
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            {
              loading ? (
                <h4 className="py-5">Loading ......</h4>
              ) : (
                <>
                  <h4 className="mb-5">Add Product</h4>
                  <Form onSubmit={addProduct}>
                    <FormGroup className="form__group">
                      <span>Product title</span>
                      <input type="text" placeholder="Double sofa" value={enterTitle} onChange={e=> setEneterTitle(e.target.value)} required />              
                    </FormGroup>
                    <FormGroup className="form__group">
                      <span>Short Description</span>
                      <input type="text" placeholder="lorem...." value={enterShortDescription} onChange={e=> setEnterShortDescription(e.target.value)} required />
                    </FormGroup>
                    <FormGroup className="form__group">
                      <span>Description</span>
                      <input type="text" placeholder="Description....." value={enterDescription} onChange={e=> setEneterDescription(e.target.value)} required />
                    </FormGroup>
                    <div className="d-flex align-items-center justify-content-between gap-5">
                      <FormGroup className="form__group w-50">
                        <span>Price</span>
                        <input type="text" placeholder="Price" value={enterPrice} onChange={e=> setEneterPrice(e.target.value)} required />
                      </FormGroup>
                      <FormGroup className="form__group w-50">
                        <span>Category</span>
                        <select className="w-100 p-2" value={enterCategory} onChange={e=> setEneterCategory(e.target.value)} required>
                          <option value="chair">Chair</option>
                          <option value="sofa">Sofa</option>
                          <option value="mobile">Mobile</option>
                          <option value="watch">Watch</option>
                          <option value="wireless">Wireless</option>
                        </select>
                      </FormGroup>
                    </div>
                    <div>
                      <FormGroup className="form__group">
                        <span>Product Image</span>
                        <input type="file" onChange={e => setEneterProductImg(e.target.files[0])} required/>
                      </FormGroup>
                    </div>
                    <button className="buy__btn" type="submit">Add Product</button>
                  </Form>
                </>
              )
            }
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AddProducts