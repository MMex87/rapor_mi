import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ActionType from '../../../../redux/reducer/globalActionType'
import axios from '../../../../api/axios'
import jwt_decode from 'jwt-decode'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'


const TambahMapel = (props) => {
    // alert
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: '#343a40'
    })

    // Deklarasi Hooks, params, dan axios
    const navigate = useNavigate()
    const params = useParams()
    const axiosJWT = axios.create()



    // state data
    const [nama, setMapel] = useState('')
    const [induk, setInduk] = useState('')
    const [kkm, setKkm] = useState('')
    const [idGuru, setIdGuru] = useState('')
    const [guru, setGuru] = useState([])
    const [jtm, setJtm] = useState(0)

    // state message
    const [msg, setMsg] = useState('')

    // menampung Data Id Kelas
    const id_kelas = params.idKelas


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
            if (decoded.role == "Kepala Sekolah") {
                return navigate('/kepala/mapel')
            }
        } catch (error) {
            return navigate('/')
            // console.error(error);
        }
    }

    // get Datas
    const getGuru = async () => {
        try {
            const response = await axiosJWT.get(`/guru`, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
            setGuru(response.data)
        } catch (err) {
            console.error(err)
        }
    }

    const getGuruId = async (val) => {
        try {
            const response = await axiosJWT.get(`/guru/${val}`, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
            setJtm(parseInt(response.data.jtm) + 2)
        } catch (error) {
            console.log(error);
        }
    }

    // handle Tambah Data
    const Tambah = async (e) => {
        e.preventDefault()
        try {
            if (nama === '' || induk === '' || idGuru === '') {
                Toast.fire({
                    icon: 'warning',
                    title: 'Tolong Isi dengan Lengkap',

                })
            }
            else {
                await axios.put(`/guru/${idGuru}`, {
                    jtm
                })
                await axios.post('/mapel', {
                    nama, induk, kkm, idGuru, id_kelas
                })
                Toast.fire({
                    icon: 'success',
                    title: 'Data Berhasil Ditambahkan!',

                })
                navigate('/mapel')
            }
        } catch (err) {
            setMsg(err.response.data.msg)
        }
    }

    const handleSetGuru = (val) => {
        setIdGuru(val)
        getGuruId(val)
    }


    // hooks use effect
    useEffect(() => {
        refreshToken()
        getGuru()
    }, [])


    // axios interceptors
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
                                    <h3 className="card-title col-4">Tambah Mapel</h3>
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
                                            <form onSubmit={ Tambah }>
                                                <div>
                                                    <b className='text text-danger'>{ msg }</b>
                                                </div>
                                                <div>
                                                    <label>Nama Mapel</label>
                                                    <select className="form-control select2" style={ { width: '100%' } } onChange={ (e) => setMapel(e.target.value) }>
                                                        <option selected="selected" value={ '' }>-- Pilih Mapel --</option>
                                                        <option value={ 'Bahasa Indonesia' }>Bahasa Indonesia</option>
                                                        <option value={ 'Matematika' }>Matematika</option>
                                                        <option value={ 'IPA' }>IPA</option>
                                                        <option value={ 'Bahasa Arab' }>Bahasa Arab</option>
                                                    </select>
                                                </div>
                                                <div className='mt-3'>
                                                    <label>Induk</label>
                                                    <select className="form-control select2" style={ { width: '100%' } } onChange={ (e) => setInduk(e.target.value) }>
                                                        <option selected="selected" value={ '' }>-- Pilih Induk --</option>
                                                        <option value={ 'National' }>National</option>
                                                        <option value={ 'Muatan Lokal' }>Muatan Lokal</option>
                                                    </select>
                                                </div>
                                                <div className='mt-3'>
                                                    <label>KKM</label>
                                                    <input type='number' className="form-control select2" style={ { width: '100%' } } onChange={ (e) => setKkm(e.target.value) } value={ kkm } />
                                                </div>
                                                <div className='mt-3'>
                                                    <label>Nama Guru</label>
                                                    <select className="form-control select2" style={ { width: '100%' } } onChange={ (e) => handleSetGuru(e.target.value) }>
                                                        <option selected="selected" value={ '' }>-- Pilih Guru --</option>
                                                        { guru.map((val) => (
                                                            <option value={ val.id }>{ val.nama }</option>
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

export default connect(mapStateToProps, mapDispatchToProps)(TambahMapel)