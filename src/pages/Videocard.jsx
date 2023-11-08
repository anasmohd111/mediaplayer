import { Trash2 } from 'feather-icons-react/build/IconComponents';
import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { addHistory, deleteVideo } from '../services/allapi';
import { v4 as uuidv4 } from 'uuid';

function Videocard({ card, handleDeleteStatus, insidecategory }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = async () => {

        setShow(true);

        // auto id create
        const uid = uuidv4();
        console.log(uid);

        // date and time
        let cardTime = new Date()
        console.log(cardTime);

        // fetching caption & url
        const { caption, url } = card

        if (uid != "" && caption != "" && url != "" && cardTime != "") {
            const body = {
                id: uid,
                cardName: caption,
                url: url,
                date: cardTime
            }
            const response = await addHistory(body)
            console.log(response.data);
        }

    };

    // function for video delete
    const removeItem = async (id) => {

        // make call allapi page
        let response = await deleteVideo(id)
        // console.log(response);

        if (response.status >= 200 && response.status < 300) {
            handleDeleteStatus(true)
        }

    }

    // drag started
    const dragStarted = (e, id) => {

        console.log("Drag started and source card id:", id);
        e.dataTransfer.setData("cardId", id)

    }

    return (
        <>
            <div>

                <Card draggable onDragStart={e => dragStarted(e, card?.id)} className='shadow' style={{ cursor: 'pointer' }}>
                    <Card.Img variant="top" height={'300px'} style={{ objectFit: "cover" }} src={card?.thumbnail} onClick={handleShow} />
                    <Card.Body style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Card.Title style={{ marginBottom: '0px' }}>{card?.caption}</Card.Title>

                        {
                            insidecategory ? "" :
                                <Trash2 onClick={() => removeItem(card?.id)} color='red' />
                        }

                    </Card.Body>
                </Card>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{card?.caption}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <iframe width="100%" height="400px" src={`${card.url}?autoplay=1`} ></iframe>
                    </Modal.Body>
                </Modal>

            </div >
        </>
    )
}

export default Videocard
