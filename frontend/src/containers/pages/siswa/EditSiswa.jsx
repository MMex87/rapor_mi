import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ActionType from '../../../redux/reducer/globalActionType'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'



export const EditSiswa = (props) => {
    // deklarasi hooks, axios, dan params
    const navigate = useNavigate()
    const axiosJWT = axios.create()
    const params = useParams()

    // state 
    const [msg, setMsg] = useState('')
    const [nama, setNama] = useState('')
    const [nisn, setNisn] = useState('')
    const [tanggal_lahir, setTanggal] = useState('')
    const [jenis_kelamin, setJenis] = useState('')
    const [id_kelas, setIdKelas] = useState('')
    const [kelas, setKelas] = useState([])
    const [siswa, setSiswa] = useState([])

    // get Id Siswa
    const id_siswa = params.idSiswa

    // refresh Token
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


    // Datas
    const getKelas = async () => {
        try {
            const response = await axiosJWT.get(`http://localhost:7000/kelas`, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
            setKelas(response.data)
        } catch (error) {
            console.error(error);
        }
    }
    const getSiswa = async (val) => {
        try {
            const response = await axiosJWT.get(`http://localhost:7000/siswa/${val}`, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
            setSiswa(response.data)
            setNama(response.data.nama)
            setNisn(response.data.nisn)
            setJenis(response.data.jenis_kelamin)
            setIdKelas(response.data.id_kelas)
            setTanggal(response.data.tanggal_lahir)
        } catch (error) {
            console.error(error);
        }
    }

    // handle Edit

    const edit = async (e) => {
        e.preventDefault()
        try {
            if (nama == "" || nisn == '' || tanggal_lahir == '' || jenis_kelamin == '' || id_kelas == '') {
                setMsg("Tolong isi dengan Lengkap")
            } else {
                setMsg('')
                const status = 'aktiv'
                await axios.put(`http://localhost:7000/siswa/${id_siswa}`, {
                    nisn, nama, tanggal_lahir, jenis_kelamin, status, id_kelas
                })
                navigate('/siswa')
            }
        } catch (error) {
            console.error(error);
        }

    }

    // Hooks Use Effect
    useEffect(() => {
        refreshToken()
        getKelas()
        getSiswa(id_siswa)
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
                                    <li className="breadcrumb-item"><Link to={ "/siswa" }>Siswa</Link></li>
                                    <li className="breadcrumb-item active">Edit Siswa</li>
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
                                    <h3 className="card-title col-4">Edit Data Siswa</h3>
                                    <div className="col-6"></div>
                                    <div className="col-2 d-flex justify-content-end">
                                        <Link type='button' className='btn btn-warning btn-sm' to={ `/siswa` }>
                                            Kembali <i className="fa-solid fa-rotate-left"></i>
                                        </Link>
                                    </div>
                                </div>
                                <div className="card-body table-responsive p-2">
                                    <div className="col-md-10">
                                        <div className="form-group">
                                            <form onSubmit={ edit }>
                                                <div>
                                                    <b className='text text-danger'>{ msg }</b>
                                                </div>
                                                <div>
                                                    <label>Nama Siswa</label>
                                                    <input type="text" className="form-control select2" style={ { width: '100%' } } onChange={ (e) => setNama(e.target.value) } value={ nama } />
                                                </div>
                                                <div className='mt-3'>
                                                    <label>NISN</label>
                                                    <input type="text" className="form-control select2" style={ { width: '100%' } } onChange={ (e) => setNisn(e.target.value) } value={ nisn } />
                                                </div>
                                                <div className='mt-3'>
                                                    <label>Tanggal Lahir</label>
                                                    <input type="date" className="form-control select2" style={ { width: '100%' } } onChange={ (e) => setTanggal(e.target.value) } value={ tanggal_lahir } />
                                                </div>
                                                <div className='mt-3'>
                                                    <label>Jenis Kelamin</label>
                                                    <select className="form-control select2" style={ { width: '100%' } } onChange={ (e) => setJenis(e.target.value) }>
                                                        <option selected value={ "" }>-- Pilih Jenis Kelamin --</option>
                                                        <option selected={ siswa.jenis_kelamin == 'Laki-Laki' ? 'selected' : '' } value="Laki-Laki">Laki-Laki</option>
                                                        <option selected={ siswa.jenis_kelamin == 'Perempuan' ? 'selected' : '' } value="Perempuan">Perempuan</option>
                                                    </select>
                                                </div>
                                                <div className='mt-3'>
                                                    <label>Kelas</label>
                                                    <select className="form-control select2" style={ { width: '100%' } } onChange={ (e) => setIdKelas(e.target.value) }>
                                                        <option selected value={ "" }>-- Pilih Kelas --</option>
                                                        { kelas.map((val, index) => (
                                                            <option key={ index } selected={ siswa.id_kelas == val.id ? 'selected' : '' } value={ val.id }>{ val.nama_kelas }</option>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditSiswa)