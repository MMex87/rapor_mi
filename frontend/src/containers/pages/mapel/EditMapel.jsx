import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ActionType from '../../../redux/reducer/globalActionType'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { connect } from 'react-redux'

export const EditMapel = (props) => {

    // Deklarasi Hooks, params, dan axios
    const navigate = useNavigate()
    const params = useParams()
    const axiosJWT = axios.create()


    // state data
    const [nama, setNama] = useState('')
    const [induk, setInduk] = useState('')
    const [idGuru, setIdGuru] = useState('')
    const [guru, setGuru] = useState([])
    const [mapel, setMapel] = useState([])

    // state message
    const [msg, setMsg] = useState('')

    // menampung Data Id Kelas
    const id_mapel = params.idMapel


    // refresh Token
    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:7000/token')
            props.handleToken(response.data.accessToken)
            const decoded = jwt_decode(response.data.accessToken)
            props.handleName(decoded.name)
            props.handleExp(decoded.exp)
            props.handlePicture(decoded.picture)
        } catch (error) {
            return navigate('/')
            // console.error(error);
        }
    }

    // get Datas
    const getGuru = async () => {
        try {
            const response = await axiosJWT.get(`http://localhost:7000/guru`, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
            setGuru(response.data)
        } catch (err) {
            console.error(err)
        }
    }
    const getMapel = async (val) => {
        try {
            const response = await axiosJWT.get(`http://localhost:7000/mapel/${val}`, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
            setMapel(response.data)
            setNama(response.data.nama)
            setInduk(response.data.induk)
            setIdGuru(response.data.idGuru)
        } catch (err) {
            console.error(err)
        }
    }

    // handle Tambah Data
    const Edit = async (e) => {
        e.preventDefault()
        try {
            if (nama === '' || induk === '' || idGuru === '') {
                setMsg('Tolong Isi dengan Lengkap')
            }
            else {
                setMsg('')
                await axios.put(`http://localhost:7000/mapel/${id_mapel}`, {
                    nama, induk, idGuru
                })
                navigate('/mapel')
            }
        } catch (err) {
            setMsg(err.response.data.msg)
        }
    }


    // hooks use effect
    useEffect(() => {
        refreshToken()
        getGuru()
        return () => {
            getMapel(id_mapel)
        }
    }, [])


    // axios interceptors
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
                                <h1 className="m-0">Mata Pelajaran</h1>
                            </div>{/* /.col */ }
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to={ "/dashboard" }>Dashboard</Link></li>
                                    <li className="breadcrumb-item"> <Link to={ "/mapel" }>Mapel</Link></li>
                                    <li className="breadcrumb-item active">EditMapel</li>
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
                                    <h3 className="card-title col-4">Edit Mapel</h3>
                                    <div className="col-6"></div>
                                    <div className="col-2 d-flex justify-content-end">
                                        <Link type='button' className='btn btn-warning btn-sm' to={ '/mapel' }>
                                            Kembali <i className="fa-solid fa-rotate-left"></i>
                                        </Link>
                                    </div>
                                </div>
                                {/* /.card-header */ }
                                <div className="card-body table-responsive p-2">
                                    <div className="col-md-10">
                                        <div className="form-group">
                                            <form onSubmit={ Edit }>
                                                <div>
                                                    <b className='text text-danger'>{ msg }</b>
                                                </div>
                                                <div>
                                                    <label>Nama Mapel</label>
                                                    <select className="form-control select2" style={ { width: '100%' } } onChange={ (e) => setNama(e.target.value) }>
                                                        <option selected value={ '' }>-- Pilih Mapel --</option>
                                                        <option selected={ mapel.nama == 'Bahasa Indonesia' ? 'selected' : '' } value={ 'Bahasa Indonesia' }>Bahasa Indonesia</option>
                                                        <option selected={ mapel.nama == 'Matematika' ? 'selected' : '' } value={ 'Matematika' }>Matematika</option>
                                                        <option selected={ mapel.nama == 'IPA' ? 'selected' : '' } value={ 'IPA' }>IPA</option>
                                                        <option selected={ mapel.nama == 'Bahasa Arab' ? 'selected' : '' } value={ 'Bahasa Arab' }>Bahasa Arab</option>
                                                        <option selected={ mapel.nama == 'Bahasa Jawa' ? 'selected' : '' } value={ 'Bahasa Jawa' }>Bahasa Jawa</option>
                                                    </select>
                                                </div>
                                                <div className='mt-3'>
                                                    <label>Induk</label>
                                                    <select className="form-control select2" style={ { width: '100%' } } onChange={ (e) => setInduk(e.target.value) }>
                                                        <option selected value={ '' }>-- Pilih Induk --</option>
                                                        <option selected={ mapel.induk == 'National' ? 'selected' : '' } value={ 'National' }>National</option>
                                                        <option selected={ mapel.induk == 'Muatan Lokal' ? 'selected' : '' } value={ 'Muatan Lokal' }>Muatan Lokal</option>
                                                    </select>
                                                </div>
                                                <div className='mt-3'>
                                                    <label>Nama Guru</label>
                                                    <select className="form-control select2" style={ { width: '100%' } } onChange={ (e) => setIdGuru(e.target.value) }>
                                                        <option selected value={ '' }>-- Pilih Guru --</option>
                                                        { guru.map((val) => (
                                                            <option selected={ mapel.idGuru == val.id ? 'selected' : '' } value={ val.id }>{ val.nama }</option>
                                                        )) }
                                                    </select>
                                                </div>
                                                <div className='mt-5 d-flex justify-content-end'>
                                                    <button className='btn btn-success'>
                                                        Save
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
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
        expired: state.expired,
        picture: state.picture
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleName: (nama) => dispatch({ type: ActionType.SET_NAME_USER, index: nama }),
        handleToken: (token) => dispatch({ type: ActionType.SET_TOKEN_USER, index: token }),
        handleExp: (exp) => dispatch({ type: ActionType.SET_EXPIRED_USER, index: exp }),
        handlePicture: (exp) => dispatch({ type: ActionType.SET_PICTURE_USER, index: exp })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMapel)