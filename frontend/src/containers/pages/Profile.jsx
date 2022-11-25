import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ActionType from '../../redux/reducer/globalActionType'
import axios from '../../api/axios'
import jwt_decode from 'jwt-decode'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export const Profile = (props) => {
    // deklarasi hooks dan axios
    const navigate = useNavigate()
    const axiosJWT = axios.create()

    // state
    const [userId, setUserId] = useState([])
    const [nama, setNama] = useState('')
    const [role, setRole] = useState('')
    const [picture, setPicture] = useState('')
    const [email, setEmail] = useState('')


    // refresh Token
    const refreshToken = async () => {
        try {
            const response = await axios.get('/token')
            props.handleToken(response.data.accessToken)
            const decoded = jwt_decode(response.data.accessToken)
            props.handleName(decoded.name)
            props.handleExp(decoded.exp)
            props.handlePicture(decoded.picture)
            props.handleRole(decoded.role)
            setUserId(decoded.userId)
        } catch (error) {
            return navigate('/')
        }
    }

    // get Datas
    const getUser = async (val) => {
        const response = await axiosJWT.get(`/users/${val}`, {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        })
        setNama(response.data.name)
        setRole(response.data.role)
        setPicture(response.data.picture)
        setEmail(response.data.email)
    }

    // Hooks Use Effect
    useEffect(() => {
        refreshToken()
        getUser(userId)
    }, [])


    getUser(userId)
    // axios Interceptors 
    axiosJWT.interceptors.request.use(async (config) => {
        const currenDate = new Date()
        if (props.expired * 1000 < currenDate.getTime()) {
            const response = await axios.get('/token')
            config.headers.Authorization = `Bearer ${response.data.accessToken}`
            props.handleToken(response.data.accessToken)
            const decoded = jwt_decode(response.data.accessToken)
            props.handleExp(decoded.exp)
            props.handleName(decoded.name)
            props.handlePicture(decoded.picture)
            props.handleRole(decoded.role)
        }
        return config
    })

    return (
        <div>
            <div className="content-wrapper">
                {/* Content Header (Page header) */ }
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Profile</h1>
                            </div>{/* /.col */ }
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to={ "/dashboard" }>Dashboard</Link></li>
                                    <li className="breadcrumb-item active">Profile</li>
                                </ol>
                            </div>{/* /.col */ }
                        </div>{/* /.row */ }
                    </div>{/* /.container-fluid */ }
                </div>
                <div className="container-fluid">
                    {/* /.row */ }
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title container">
                                        <h3 className="d-flex justify-content-center">{ nama }</h3>
                                    </div>
                                </div>
                                <div className='row p-5 container'>
                                    <div className="card d-flex justify-content-center" style={ { width: '24rem' } }>
                                        <img src={ "http://localhost:3000/assets/uploads/" + picture } className="card-img-top" />
                                        <div className="card-body">
                                            <ul className="list-group list-group-flush">
                                                <div class="card-header rounded-4">
                                                    Email
                                                </div>
                                                <li className="list-group-item d-flex justify-content-center">{ email }</li>
                                                <div class="card-header rounded-4">
                                                    Role
                                                </div>
                                                <li className="list-group-item d-flex justify-content-center">{ role }</li>
                                                <div class="card-header rounded-4">
                                                    Aksi
                                                </div>
                                                <li className="list-group-item d-flex justify-content-center">
                                                    <Link className='btn btn-success'>Edit Profile</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        name: state.user,
        token: state.token,
        expired: state.expired,
        picture: state.picture,
        role: state.role
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleName: (nama) => dispatch({ type: ActionType.SET_NAME_USER, index: nama }),
        handleToken: (token) => dispatch({ type: ActionType.SET_TOKEN_USER, index: token }),
        handleExp: (exp) => dispatch({ type: ActionType.SET_EXPIRED_USER, index: exp }),
        handlePicture: (exp) => dispatch({ type: ActionType.SET_PICTURE_USER, index: exp }),
        handleRole: (role) => dispatch({ type: ActionType.SET_ROLE_USER, index: role })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)