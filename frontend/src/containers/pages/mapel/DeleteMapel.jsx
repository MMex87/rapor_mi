import React, { useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const DeleteMapel = () => {
    const params = useParams()
    const navigate = useNavigate()

    const idmapel = params.idMapel

    const deleteMapel = async () => {
        try {
            const response = await axios.delete(`http://localhost:7000/mapel/${idmapel}`)
            navigate('/mapel')
        } catch (error) {
            console.error(error)
            navigate('/mapel')
        }
    }


    useEffect(() => {
        deleteMapel()
    }, [])



    return (
        <div>DeleteMapel</div>
    )
}


export default DeleteMapel