import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ActionType from '../../../../redux/reducer/globalActionType'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export const Guru = (props) => {
    // deklarasi hooks dan axios
    const navigate = useNavigate()
    const axiosJWT = axios.create()

    // deklarasi State
    const [guru, setGuru] = useState([])

    // refresh Token
    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:7000/token')
            props.handleToken(response.data.accessToken)
            const decoded = jwt_decode(response.data.accessToken)
            props.handleName(decoded.name)
            props.handleExp(decoded.exp)
            props.handlePicture(decoded.picture)
            props.handleRole(decoded.role)
            if (decoded.role == "Admin") {
                return navigate('/guru')
            }
        } catch (error) {
            return navigate('/')
        }
    }

    // get Datas
    const getGuru = async () => {
        try {
            const response = await axiosJWT.get('http://localhost:7000/guru', {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
            setGuru(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    // Hooks Use Effect
    useEffect(() => {
        refreshToken()
        getGuru()
    }, [])

    // axios Interceptors 
    axiosJWT.interceptors.request.use(async (config) => {
        const currenDate = new Date()
        if (props.expired * 1000 < currenDate.getTime()) {
            const response = await axios.get('http://localhost:7000/token')
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
                                <h1 className="m-0">Siswa</h1>
                            </div>{/* /.col */ }
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to={ "/dashboard" }>Dashboard</Link></li>
                                    <li className="breadcrumb-item active">Guru</li>
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
                                <div className="card-header row">
                                    <h3 className="card-title col-4">Data Guru</h3>
                                    <div className="col-6"></div>
                                    <div className="card-tools col-1">
                                        <div className="input-group input-group-sm" style={ { width: 150, marginTop: 1 } }>
                                            <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
                                            <div className="input-group-append">
                                                <button type="submit" className="btn btn-default">
                                                    <i className="fas fa-search" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body table-responsive p-0">
                                    <table className="table table-hover table-dark text-nowrap">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>NUPTK</th>
                                                <th>Nama Guru</th>
                                                <th>Tanggal Lahir</th>
                                                <th>JTM</th>
                                                <th>Pendidikan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { guru.map((val, index) => (
                                                <tr key={ index + 1 }>
                                                    <td className='col-sm-1'>{ index + 1 }</td>
                                                    <td className='col-sm-2'>{ val.nuptk }</td>
                                                    <td className='col-sm-3'>{ val.nama }</td>
                                                    <td className='col-sm-1'>{ val.tanggal_lahir }</td>
                                                    <td className='col-sm-1'>
                                                        { val.jtm }
                                                    </td>
                                                    <td className='col-sm-1'>
                                                        { val.pendidikan }
                                                    </td>
                                                </tr>
                                            )) }
                                        </tbody>
                                    </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(Guru)