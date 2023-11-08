import React from 'react'
import { PlusCircle } from 'feather-icons-react/build/IconComponents';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addVideo } from '../services/allapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Add({ handleresponse }) {

    const [show, setShow] = useState(false);
    const [uploadData, setuploadData] = useState({
        id: "",
        caption: "",
        thumbnail: "",
        url: ""
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const setInput = (e) => {
        const { name, value } = e.target
        setuploadData({ ...uploadData, [name]: value })
    }
    console.log(uploadData);

    const extractUrl = (e) => {
        let youtubeUrl = e.target.value

        // youtube og url
        // https://www.youtube.com/watch?v=7DaFmLEMt9c

        // embed url
        // https://www.youtube.com/embed/7DaFmLEMt9c?autoplay=1

        if (youtubeUrl.includes("v=")) {

            let index = youtubeUrl.indexOf("v=")
            console.log(index);

            let videoUrl = youtubeUrl.substring(index + 2, index + 13)
            console.log(videoUrl);

            let videoData = uploadData
            videoData.url = `https://www.youtube.com/embed/${videoUrl}`
            setuploadData(videoData)
        }
    }

    console.log(uploadData);

    const handleAdd = async () => {

        const { id, caption, thumbnail, url } = uploadData

        if (!id || !caption || !thumbnail || !url) {
            toast.error("Please fill the form completely", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        } else {
            // make a api call to allapi.js
            const response = await addVideo(uploadData)
            // console.log(response.data);
            if (response.status >= 200 && response.status < 300) {
                // console.log(response.data);
                handleresponse(response.data)
                setShow(false)
                toast.success("New video uploaded successfully", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
            } else {
                toast.error("Please provide a unique id", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
            }
        }

    }

    return (
        <>
            <div className='btn' onClick={handleShow}>
                <PlusCircle color='green' size={40} />
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Upload Video Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>

                        <FloatingLabel className='mb-3' controlId="floatingId" label="Upload Video Id">
                            <Form.Control type="text" placeholder="Video Id" name='id' onChange={setInput} />
                        </FloatingLabel>

                        <FloatingLabel className='mb-3' controlId="floatingCaption" label="Upload Video Caption">
                            <Form.Control type="text" placeholder="Video Caption" name='caption' onChange={setInput} />
                        </FloatingLabel>

                        <FloatingLabel className='mb-3' controlId="floatingImage" label="Upload Video Cover Image Url">
                            <Form.Control type="text" placeholder="Video Image" name='thumbnail' onChange={setInput} />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingLink" label="Upload Video Link">
                            <Form.Control type="text" placeholder="Video Link" name='url' onChange={extractUrl} />
                        </FloatingLabel>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleAdd} variant="primary">Add</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark" />
        </>
    )
}

export default Add
