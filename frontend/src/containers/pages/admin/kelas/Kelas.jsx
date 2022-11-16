import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ActionType from '../../../../redux/reducer/globalActionType'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Kelas = (props) => {
    // deklarasi hooks dan axios
    const navigate = useNavigate()
    const axiosJWT = axios.create()

    // state
    const [msg, setMsg] = useState('')
    const [nama_kelas, setNama] = useState('')
    const [wali, setWali] = useState('')
    const [display, setDisplay] = useState(false)
    const [visi, setVisi] = useState('invisible')
    const [idKelas, setIdKelas] = useState('')
    const [id_guru, setIdGuru] = useState('')

    // state Data
    const [kelas, setKelas] = useState([])
    const [guru, setGuru] = useState([])
    const [siswa, setSiswa] = useState([])



    // handel Auto complate

    const handleAuto = (val, val2) => {
        setDisplay(false)
        setWali(val)
        setIdGuru(val2)
    }

    // handel edit
    const handleEdit = (id, nama, idGuru) => {
        setVisi('visible')
        setIdKelas(id)
        setNama(nama)
        setIdGuru(idGuru)
        getGuruId(idGuru)
    }

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
        } catch (error) {
            return navigate('/')
        }
    }


    // get Datas
    const getKelas = async () => {
        try {
            const response = await axiosJWT.get('http://localhost:7000/kelas', {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
            setKelas(response.data)
        } catch (error) {
            console.error(error)
        }
    }
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
    const getSiswa = async () => {
        try {
            const response = await axiosJWT.get('http://localhost:7000/siswa', {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
            setSiswa(response.data)
        } catch (error) {
            console.error(error);
        }
    }
    const getGuruId = async (idGuru) => {
        try {
            const response = await axiosJWT.get(`http://localhost:7000/guru/${idGuru}`, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
            setWali(response.data.nama)
        } catch (error) {
            console.error(error)
        }
    }

    // handel tambah kelas
    const Tambah = async (e) => {
        e.preventDefault()
        if (idKelas == '') {
            try {
                await axios.post('http://localhost:7000/kelas', {
                    nama_kelas, id_guru
                })
                getKelas()
                setVisi('invisible')
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                await axios.put(`http://localhost:7000/kelas/${idKelas}`, {
                    nama_kelas, id_guru
                })
                getKelas()
                setVisi('invisible')
            } catch (error) {
                console.error(error);
            }
        }
    }

    // handale hapus
    const handleHapus = async (id_kelas) => {
        try {
            await axios.delete(`http://localhost:7000/kelas/${id_kelas}`)
            setMsg('Data Berhasil Dihapus')
            getKelas()
        } catch (error) {
            console.error(error)
        }
    }

    // Hooks Use Effect
    useEffect(() => {
        refreshToken()
        getGuru()
        getKelas()
        getSiswa()
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
                                <h1 className="m-0">Kelas</h1>
                            </div>{/* /.col */ }
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to={ "/dashboard" }>Dashboard</Link></li>
                                    <li className="breadcrumb-item active">Kelas</li>
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
                                    <h3 className="card-title col-4">Data Kelas</h3>
                                    <div className="col-5"></div>
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
                                    <div className="col-2 d-flex justify-content-end">
                                        <a type='button' onClick={ () => setVisi('visible') } className='btn btn-success btn-sm' href='#edit' >
                                            Tambah <i className="fa-solid fa-plus"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="row p-5">
                                    { kelas.map((val, index) => (
                                        <div className="col-md-6" key={ index }>
                                            <div className="card card-success shadow-sm">
                                                <div className="card-header">
                                                    <h3 className="card-title container">Kelas { val.nama_kelas }</h3>
                                                    <div className="card-tools d-flex justify-content-end">
                                                        <button type="button" className="btn btn-tool " data-card-widget="collapse">
                                                            <i className="fas fa-minus" />
                                                        </button>
                                                    </div>
                                                    <div className="card-tools d-flex justify-content-end">
                                                        <button type="button" className="btn btn-tool" data-card-widget="maximize"><i className="fas fa-expand" />
                                                        </button>
                                                    </div>
                                                    <div className="card-tools d-flex justify-content-end me-5">
                                                        <button type="button" className="btn btn-tool" data-card-widget="remove"><i className="fas fa-times" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row mb-3">
                                                        <div className="col-md-3">
                                                            Wali Kelas
                                                        </div>
                                                        <div className="col-md-1">:</div>
                                                        <div className="col-md-6">
                                                            {
                                                                guru.map((value) => (
                                                                    <>
                                                                        {
                                                                            value.id === val.id_guru ? value.nama : ''
                                                                        }
                                                                    </>
                                                                ))
                                                            }
                                                        </div>
                                                        <div className="col-md-1 d-flex justify-content-end">
                                                            <a className='btn btn-warning btn-sm me-5' href='#edit' onClick={ () => handleEdit(val.id, val.nama_kelas, val.id_guru) }>
                                                                <i className="fa-regular fa-pen-to-square"></i>
                                                            </a>
                                                        </div>
                                                        <div className="col-md-1 d-flex justify-content-end">
                                                            <button className='btn btn-danger btn-sm ms-3' onClick={ () => confirm('Yakin Ingin menghapus?') ? handleHapus(val.id) : '' } >
                                                                <i className="fa-solid fa-trash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <table className="table table-hover table-dark text-nowrap">
                                                            <thead>
                                                                <tr>
                                                                    <th>id</th>
                                                                    <th>Siswa</th>
                                                                    <th>NISN</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                { siswa.map((value, indek) => (
                                                                    value.id_kelas === val.id ?
                                                                        <tr key={ indek }>
                                                                            <td>{ value.id }</td>
                                                                            <td>{ value.nama }</td>
                                                                            <td>{ value.nisn }</td>
                                                                        </tr>
                                                                        : ''
                                                                )) }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )) }
                                </div>
                            </div>
                            <div className={ visi }>
                                <div className={ 'card' } id='edit'>
                                    <div className="card-header row">
                                        <h3 className="card-title col-4">Tambah Kelas</h3>
                                    </div>
                                    <div className="row p-5">
                                        <div className="col-md-10" >
                                            <div className="form-group">
                                                <form onSubmit={ Tambah }>
                                                    <div>
                                                        <b className='text text-danger'>{ msg }</b>
                                                    </div>
                                                    <div>
                                                        <label>Nama Kelas</label>
                                                        <input type="text" className="form-control select2" style={ { width: '100%' } } onChange={ (e) => setNama(e.target.value) } value={ nama_kelas } />
                                                    </div>
                                                    <div className='mt-3'>
                                                        <label>Wali Kelas</label>
                                                        <input type="text" className="form-control select2" onClick={ () => setDisplay(!display) } style={ { width: '100%' } } onChange={ (e) => setWali(e.target.value) } value={ wali } />
                                                        {
                                                            display && (
                                                                <div className="flex-container flex-column pos-rel">
                                                                    <ul className="list-group list-group-flush">
                                                                        {
                                                                            guru
                                                                                .filter(({ nama }) => nama.indexOf(wali.toString()) > -1)
                                                                                .map((v, i) => (
                                                                                    <li key={ i } onClick={ () => { handleAuto(v.nama, v.id) } } class="list-group-item">{ v.nama }</li>
                                                                                ))
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            )
                                                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(Kelas)