import '../styles/Login.scss'

import { useState } from 'react'
import { Container, Row, Col, Form, FormGroup } from "reactstrap"
import Helmet from '../components/Helmet/Helmet'
import { Link, useNavigate } from 'react-router-dom'

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { setDoc, doc } from 'firebase/firestore'

import { auth } from '../firebase.config'
import { storage } from '../firebase.config'
import { db } from '../firebase.config'

import { toast } from 'react-toastify'

const Signup = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoadnig] = useState(false)

  const navigate = useNavigate()

  const signup = async(e)=>{
    e.preventDefault()
    setLoadnig(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      const user = userCredential.user;

      const storageRef = ref(storage, `images/${Date.now() + username}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) =>{
            //update user profile
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL,
            });

            // store user data in firestore database
            await setDoc(doc(db, 'users', user.uid),{
              uid: user.uid,
              displayName: username,
              email,
              photoUrl: downloadURL,
            });  
          });
        }
      );

      setLoadnig(false)
      toast.success('Account created')
      navigate('/login')
    
    } catch (error){
      setLoadnig(false)
      toast.error('something went wrong')
    }

  }  

  return (
    <Helmet title='Signup'>
      <section>
        <Container>
          <Row>
            {
              loading? (
              <Col lg='12' className='text-center'>
                <h5 className="fw-bold">Loading....</h5> 
              </Col>
              ) : (
              <Col lg='6' className='m-auto text-center'>
                <h3 className="fw-bold fs-4">Signup</h3>
                <Form className='auth__form' onSubmit={signup}>
                  <FormGroup className='form__group'>
                    <input type="text" placeholder='UserName'
                    value={username}  onChange={e=> setUsername(e.target.value)}/>
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <input type="email" placeholder='Enter your email'
                    value={email}  onChange={e=> setEmail(e.target.value)}/>
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <input type="password" placeholder='Enter your password'
                    value={password}  onChange={e=> setPassword(e.target.value)} />
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <input type="file" onChange={e=> setFile(e.target.files[0])} />
                  </FormGroup>
                  <button type='submit' className="buy__btn login__btn">Create an account</button>
                  <p>Already have an account? <Link to='/login'>Login</Link></p>
                </Form>
              </Col>
              )
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Signup