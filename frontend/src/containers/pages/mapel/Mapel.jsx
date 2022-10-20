import React, { useEffect, useState } from 'react'
// import refreshToken from '../../../config/token/refreshToken'
import { useNavigate } from 'react-router-dom'
import ActionType from '../../../redux/reducer/globalActionType'
import axios from 'axios'
// import axiosJWT from '../../../api/axios'
import jwt_decode from 'jwt-decode'
import { connect } from 'react-redux'

const Mapel = (props) => {
    const navigate = useNavigate()

    const [mapel, setMapel] = useState([])
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const axiosJWT = axios.create()

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:7000/token')
            props.handleToken(response.data.accessToken)
            const decoded = jwt_decode(response.data.accessToken)
            props.handleName(decoded.name)
            props.handleExp(decoded.exp)
        } catch (error) {
            return navigate('/')
        }
    }

    const getMapel = async () => {
        try {
            console.log(props.token)
            const response = await axiosJWT.get('http://localhost:7000/mapel', {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
            console.log(response.data);
            setMapel(response.data)
        } catch (error) {
            console.error(error);

        }
    }


    useEffect(() => {
        refreshToken()
        getMapel()
    }, [])



    axiosJWT.interceptors.request.use(async (config) => {
        const currenDate = new Date()
        if (props.expired * 1000 < currenDate.getTime()) {
            const response = await axios.get('http://localhost:7000/token')
            config.headers.Authorization = `Bearer ${response.data.accessToken}`
            props.handleToken(response.data.accessToken)
            const decoded = jwt_decode(response.data.accessToken)
            props.handleExp(decoded.exp)
            props.handleName(decoded.name)
        }
        return config
    })
    // console.log(props.token)
    // console.log(mapel);

    // console.log(props.token);


    return (
        <div>
            <div className="content-wrapper">
                {/* Content Header (Page header) */ }
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Mata Pelajaran</h1>
                            </div>{/* /.col */ }
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Mapel</li>
                                </ol>
                            </div>{/* /.col */ }
                        </div>{/* /.row */ }
                    </div>{/* /.container-fluid */ }
                </div>
                {/* /.content-header */ }
                <div className="container-fluid">
                    {/* /.row */ }
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header row">
                                    <h3 className="card-title col-4">Responsive Hover Table</h3>
                                    <div className="col-6"></div>
                                    <div className="card-tools col-2">
                                        <div className="input-group input-group-sm" style={ { width: 150 } }>
                                            <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
                                            <div className="input-group-append">
                                                <button type="submit" className="btn btn-default">
                                                    <i className="fas fa-search" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /.card-header */ }
                                <div className="card-body table-responsive p-0">
                                    <table className="table table-hover table-dark text-nowrap">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Mata Pelajaraan</th>
                                                <th>Induk</th>
                                                <th>Kelas</th>
                                                <th>Guru</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { mapel.map((val, index) => (
                                                <tr key={ index }>
                                                    <td className='col-1'>{ index + 1 }</td>
                                                    <td className='col-3'>{ val.nama }</td>
                                                    <td className='col-2'>{ val.induk }</td>
                                                    <td className='col-2'>5A</td>
                                                    <td className='col-2'><span className="tag tag-success">Approved</span></td>
                                                    <td className='d-flex justify-content-around'>
                                                        <div className='me-5'>
                                                            <button className='btn btn-warning'>
                                                                Edit
                                                            </button>
                                                        </div>
                                                        <div className='ms-5'>
                                                            <button className='btn btn-danger'>
                                                                Hapus
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                {/* /.card-body */ }
                            </div>
                            {/* /.card */ }
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
        expired: state.expired
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleName: (nama) => dispatch({ type: ActionType.SET_NAME_USER, index: nama }),
        handleToken: (token) => dispatch({ type: ActionType.SET_TOKEN_USER, index: token }),
        handleExp: (exp) => dispatch({ type: ActionType.SET_EXPIRED_USER, index: exp })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Mapel)