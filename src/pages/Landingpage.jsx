import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Landingpage() {

    // use navigate is a hook
    const navigate = useNavigate()

    const handleNavigate = () => {
        // navigate to home
        navigate('/home')
    }

    return (
        <div>
            <Row className='align-item-center'>

                <Col></Col>
                <Col lg={6}>
                    <h1>Welcome to Videoooooo.com</h1>
                    <p style={{ textAlign: "justify" }}>When user can use their favourite videos. User can upload any youtube videos by copy and paste their url. Videoooooo.com will allow to add and remove their uploaded videos and also arrange them in different categories by drag and drop. It is free try it now</p>
                    <button onClick={handleNavigate} className='btn btn-primary'>Click here to know more</button>
                </Col>

                <Col lg={4}>
                    <img className='img-fluid' src="https://images.unsplash.com/photo-1499162789000-cd6061f57622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="no image" />
                </Col>

                <Col></Col>

            </Row>
        </div>
    )
}

export default Landingpage
