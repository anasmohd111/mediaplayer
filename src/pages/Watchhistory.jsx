import React, { useState } from 'react'
import { getHistory } from '../services/allapi'
import { useEffect } from 'react'

function Watchhistory() {

    const [history, sethistory] = useState([])

    const getwatchHistory = async () => {
        const { data } = await getHistory()
        sethistory(data)
    }
    console.log(history);

    // hook
    useEffect(() => {
        getwatchHistory()
    }, [])

    return (
        <>
            <h1 className='ms-3 mb-5'>Watch History</h1>
            <table className='table shadow m-3 border'>

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Card Name</th>
                        <th>Url</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        history?.map((item, index) => (
                            <tr >
                                <td>{index + 1}</td>
                                <td>{item?.cardName}</td>
                                <td>{item?.url}</td>
                                <td>{item?.date}</td>
                            </tr>
                        ))
                    }
                </tbody>

            </table >
        </>
    )
}

export default Watchhistory
