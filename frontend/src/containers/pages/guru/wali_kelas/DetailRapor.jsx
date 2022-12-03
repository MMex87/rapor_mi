import React, { useEffect, useState } from 'react'
import axios from '../../../../api/axios'
import jwt_decode from 'jwt-decode'
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import ActionType from '../../../../redux/reducer/globalActionType'

const DetailRapor = (props) => {
    // Deklarasi axios
    const axiosJWT = axios.create()
    const params = useParams()

    // state data
    const [namaKelas, setNamaKelas] = useState('')
    const [namaSiswa, setNamaSiswa] = useState('')
    const [idKelas, setIdKelas] = useState('')
    const [siswa, setSiswa] = useState([])
    const [rapor, setRapor] = useState([])



    // Refresh Token
    const refreshToken = async () => {
        try {
            const response = await axios.get('/tokenGuru')
            const decoded = jwt_decode(response.data.accessToken)
            const token = response.data.accessToken
            props.handleToken(token)
            props.handleName(decoded.nama)
            props.handleExp(decoded.exp)
            props.handlePicture(decoded.picture)
            props.handleRole(decoded.role)
        } catch (error) {
            return navigate('/')
        }
    }

    // get Datas
    const handleData = async () => {
        try {
            const responseKelas = await axiosJWT.get(`/kelas/${params.idKelas}`, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
            setNamaKelas(responseKelas.data.nama_kelas)
            const responseSiswa = await axiosJWT.get(`/siswa/${params.idSiswa}`, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
            setNamaSiswa(responseSiswa.data.nama)
        } catch (error) {
            console.log(error)
        }
    }
    const getSiswa = async () => {
        try {
            const response = await axiosJWT.get(`/siswa`, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
            setSiswa(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const getRapor = async () => {
        const response = await axiosJWT.get(`/rapor/${params.idKelas}/${params.idSiswa}`, {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        })
        setRapor(response.data)
        console.log(response.data)
    }

    useEffect(() => {
        refreshToken()
        handleData()
        getSiswa()
        getRapor()
    }, [])

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date()
        if (props.expired * 1000 < currentDate.getTime()) {
            const response = await axios.get('/tokenGuru')
            config.headers.Authorization = `Bearer ${response.data.accessToken}`
            props.handleToken(response.data.accessToken)
            const decoded = jwt_decode(response.data.accessToken)
            props.handleExp(decoded.exp)
            props.handleName(decoded.nama)
            props.handlePicture(decoded.picture)
            props.handleRole(decoded.role)
        }
        return config
    }, (error) => {
        return Promise.reject(error)
    })


    return (
        <div>
            <div className="content-wrapper">
                {/* Content Header (Page header) */ }
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">{ namaSiswa }</h1>
                            </div>{/* /.col */ }
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to={ "/dashboardGuru" }>Dashboard</Link></li>
                                    <li className="breadcrumb-item"><Link to={ `/UserGuru/WaliKelas/${params.idKelas}` }>Kelas { namaKelas }</Link></li>
                                    <li className="breadcrumb-item active">Rapor</li>
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
                                    <h3 className="card-title col-4">Rapor </h3>
                                    <div className="col-5"></div>
                                    <div className="col-3 d-flex justify-content-end">
                                        <div className="card-tools">
                                            <button type="button" className="btn btn-tool " data-card-widget="collapse">
                                                <i className="fas fa-minus" />
                                            </button>
                                        </div>
                                        <div className="card-tools me-5">
                                            { }
                                            <button type="button" className="btn btn-tool" data-card-widget="remove"><i className="fas fa-times" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body table-responsive p-0">
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailRapor)