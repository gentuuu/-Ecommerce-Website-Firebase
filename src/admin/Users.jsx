import { Container, Row, Col } from "reactstrap"
import useGetData from '../custom-hooks/useGetData'

import { deleteDoc, doc } from "firebase/firestore" 
import { db } from "../firebase.config"
import { toast } from "react-toastify"

const Users = () => {

    const {data: usersData, loading} = useGetData('users')

    const deleteUser = async (id)=>{
        await deleteDoc(doc(db, 'users', id))
        toast.success('User deleted!')
    }
    
    return (
        <section>
            <Container>
                <Row>
                    <Col lg='12'>
                        <h4 className="fw-bold">Users</h4>
                    </Col>
                    <Col lg='12' className="pt-5">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <h5 className="pt-5 fw-bold">Loading...</h5>
                                ) : ( usersData?.map(user=>(
                                    <tr key={user.id}>
                                        <th><img src={user.photoUrl} alt="" /></th>
                                        <th>{user.displayName}</th>
                                        <th>{user.email}</th>
                                        <th>
                                            <button className="btn btn-danger" onClick={()=>{deleteUser(user.uid)}}>Delate</button>
                                        </th>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Users