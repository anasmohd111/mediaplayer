import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Videocard from './Videocard'
import { getVideo } from '../services/allapi'
import { useEffect } from 'react'
import { useState } from 'react'

function View({ serverRes }) {
    // create a state for holding api response
    const [allVideos, setAllVideos] = useState([])

    const [deleteStatus, setdeleteStatus] = useState(false)

    const handleDeleteStatus = (res) => {

        setdeleteStatus(res)

    }

    //create a  hook 
    useEffect(() => {

        // callback function body
        getAllVideos()

    }, [serverRes, deleteStatus])

    const getAllVideos = async () => {

        let response = await getVideo()

        setAllVideos(response.data);

    }

    console.log(allVideos);

    return (
        <div className='border p-3 ms-4'>

            <Row>
                {
                    allVideos.map(video => (

                        <Col className='ps-3 mb-3' sm={12} md={6}>
                            <Videocard card={video} handleDeleteStatus={handleDeleteStatus} />
                        </Col>

                    ))
                }
            </Row>

        </div>
    )
}

export default View
