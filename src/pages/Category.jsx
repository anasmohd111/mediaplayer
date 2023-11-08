import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCategories, deleteCategory, getallCategory, getvideo, updateCategory } from '../services/allapi';
import { useEffect } from 'react';
import { Trash2 } from 'feather-icons-react/build/IconComponents';
import { Row, Col } from 'react-bootstrap';
import Videocard from './Videocard'

function Category() {

    const [show, setShow] = useState(false);
    // category state
    const [categoryItem, setCategoryItem] = useState({ id: "", categoryName: "", allvideos: [] })
    // all category
    const [allCategory, setallCategory] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getCategoryList = async () => {

        const response = await getallCategory()
        // console.log(response.data);

        setallCategory(response.data)

    }

    console.log(allCategory);

    useEffect(() => {

        getCategoryList()

    }, [])

    // category api call
    const addCategoryForm = (e) => {

        const { name, value } = e.target
        setCategoryItem({ ...categoryItem, [name]: value })

    }

    console.log(categoryItem);

    // delete category
    const handleDeleteCategory = async (e, id) => {

        e.preventDefault()
        console.log(id);

        await deleteCategory(id)
        getCategoryList()

    }

    const handleAddCategory = async (e) => {

        e.preventDefault()
        const { id, categoryName } = categoryItem

        if (!id || !categoryName) {
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

            const response = await addCategories(categoryItem)
            console.log(response);

            if (response.status >= 200 && response.status < 300) {
                setShow(false)
                toast.success("New category added successfully", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })

                getCategoryList()

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

    // drag over
    const dragOver = e => {

        e.preventDefault()
        console.log("Dragging over the category board");

    }

    // droped
    const dropped = async (e, categoryId) => {

        console.log("Dropped category id : ", categoryId);
        let sourceCardId = e.dataTransfer.getData("cardId")
        console.log("Source card id is : ", sourceCardId);

        // logic to implement adding card in the given category
        let { data } = await getvideo(sourceCardId)

        // console.log(response);

        console.log("Source video data", data);

        let selectCategory = allCategory.find(item => item.id == categoryId)
        console.log("Target category details", selectCategory);

        selectCategory.allvideos.push(data)
        console.log("Updated target category details", selectCategory);

        await updateCategory(categoryId, selectCategory)

        getCategoryList()

    }

    return (
        <>
            <div className="d-grid">
                <div onClick={handleShow} className="btn btn-dark m-2">
                    Add Category
                </div>
            </div>

            {
                allCategory?.map(item => (
                    <div>
                        <div droppable onDragOver={e => dragOver(e)} onDrop={e => dropped(e, item?.id)} className='d-flex justify-content-between border m-2 p-3'>
                            <h4>{item.categoryName}</h4>
                            <span onClick={e => handleDeleteCategory(e, item?.id)}><Trash2 color='red'></Trash2></span>
                        </div >
                        <Row>
                            {
                                item?.allvideos.map((card) => (
                                    <Col className='p-3 mb-1 sm{12}' style={{ flex: "unset", width: "50%" }}>
                                        <Videocard card={card} insidecategory={true} />
                                    </Col>
                                ))
                            }
                        </Row>
                    </div>
                ))
            }

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <FloatingLabel className='mb-3' controlId="floatingId" label="Id">
                        <Form.Control type="text" name='id' onChange={addCategoryForm} placeholder="Id" />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingCategory" label="Category">
                        <Form.Control type="text" name='categoryName' onChange={addCategoryForm} placeholder="Category" />
                    </FloatingLabel>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddCategory}>Add</Button>
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

export default Category
