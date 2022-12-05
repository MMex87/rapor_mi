import React, { useEffect, useState } from 'react'
import axios from '../../../../api/axios'
import jwt_decode from 'jwt-decode'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import ActionType from '../../../../redux/reducer/globalActionType'
import Swal from 'sweetalert2'

export const UtsGanjil = (props) => {
    // alert
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: '#343a40'
    })


    // Deklarasi params, jenis_nilai dan axios
    const params = useParams()
    const axiosJWT = axios.create()
    const navigate = useNavigate()
    const jenisNilai = 'UTS Ganjil'

    // state data
    const [siswa, setSiswa] = useState([])
    const [kelas, setKelas] = useState([])
    const [idKelas, setIdKelas] = useState('')
    const [idSiswa, setIdSiswa] = useState('')
    const [idNilai, setIdNilai] = useState('')
    const [nilai, setNilai] = useState([])
    const [inputNilai, setInputNilai] = useState([])


    // state handle
    const [visi, setVisi] = useState('visible')
    const [visi2, setVisi2] = useState('invisible')
    // const [position, setPositon] = useState('visible')
    // const [position2, setPositon2] = useState('invisible')


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
            return navigate('/login')
        }
    }

    // get Datas

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
    const getKelas = async () => {
        try {
            const response = await axiosJWT.get(`/kelas`, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
            setKelas(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    const getNilai = async () => {
        const response = await axiosJWT.get(`/nilai`, {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        })
        setNilai(response.data)
    }

    // Handle
    // Handle tambah nilai
    const handleTambah = (val) => {
        setVisi('invisible')
        setVisi2('visible')
        setIdSiswa(val)
    }
    const handleEdit = async (val) => {
        setVisi('invisible')
        setVisi2('visible')
        setIdSiswa(val)
        const n = nilai.find(({ id_siswa, id_mapel, jenis_nilai }) => id_siswa == val && id_mapel == params.idMapel && jenis_nilai == jenisNilai)
        setInputNilai(n.nilai)
        setIdNilai(n.id)
    }
    const handleBack = () => {
        setVisi('visible')
        setVisi2('invisible')
        setIdSiswa('')
        setInputNilai('')
        setIdNilai('')
    }

    // Handle data
    const handleData = async () => {
        try {
            const response = await axiosJWT.get(`/mapel/${params.idMapel}`, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
            setIdKelas(response.data.id_kelas)
        } catch (error) {
            console.log(error)
        }
    }


    const Tambah = async (e) => {
        e.preventDefault()
        try {
            if (idNilai) {
                await axios.put(`/nilai/${idNilai}`, {
                    nilai: inputNilai
                })
                Toast.fire({
                    icon: 'success',
                    title: 'Nilai Berhasil di Update!!'
                })
            } else {
                await axios.post('/nilai', {
                    nilai: inputNilai, id_mapel: params.idMapel, id_siswa: idSiswa, jenis_nilai: jenisNilai
                })
                Toast.fire({
                    icon: 'success',
                    title: 'Nilai Berhasil di Tambah!!'
                })
            }
            setVisi('visible')
            setVisi2('invisible')
            getSiswa()
            getNilai()
            setInputNilai('')
            setIdNilai('')
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        refreshToken()
        handleData()
        getSiswa()
        getKelas()
        getNilai()
    }, [params.idMapel])

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
        <div className='position-relative p-2' style={ { height: 500 } }>
            <div className={ visi }>
                <table className="table table-hover table-dark text-nowrap position-absolute" >
                    <thead>
                        <tr className='container'>
                            <th>No</th>
                            <th>NISN</th>
                            <th>Nama Siswa</th>
                            <th>Nilai</th>
                            <th>Predikat</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        { siswa.filter(({ id_kelas }) => id_kelas == idKelas).map((val, index) => (
                            <tr key={ index }>
                                <td>{ index + 1 }</td>
                                <td>{ val.nisn }</td>
                                <td>{ val.nama }</td>
                                <td>
                                    {
                                        nilai.filter(({ id_siswa, id_mapel, jenis_nilai }) => id_siswa == val.id && id_mapel == params.idMapel && jenis_nilai == jenisNilai).map((value, index) => (
                                            <div key={ index }>
                                                { value.nilai }
                                            </div>
                                        ))
                                    }
                                </td>
                                <td >
                                    {
                                        nilai.filter(({ id_siswa, id_mapel, jenis_nilai }) => id_siswa == val.id && id_mapel == params.idMapel && jenis_nilai == jenisNilai).map((value, index) => (
                                            <div key={ index }>
                                                {
                                                    (90 < parseInt(value.nilai)) ? ('A') : (70 < parseInt(value.nilai)) ? ('B') : (50 < parseInt(value.nilai)) ? ('C') : ('D')
                                                }
                                            </div>
                                        ))
                                    }
                                </td>
                                <td className='d-flex justify-content-around'>
                                    <div key={ index } className='me-5'>
                                        {
                                            nilai.find(({ id_siswa, id_mapel, jenis_nilai }) => id_siswa == val.id && id_mapel == params.idMapel && jenis_nilai == jenisNilai) == null
                                                ? <button type='button' className='btn btn-success' onClick={ () => handleTambah(val.id) }>
                                                    Tambah Nilai
                                                </button>
                                                : <button type='button' className='btn btn-warning' onClick={ () => handleEdit(val.id) }>
                                                    Edit
                                                </button>
                                        }
                                    </div>

                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </div>
            <div className={ visi2 }>
                <div className='card position-absolute' style={ { width: '99%' } }>
                    <div className="card-header row">
                        <h3 className="card-title col-4">Tambah Kelas</h3>
                    </div>
                    <div className="row p-5">
                        <div className="col-md-10" >
                            <div className="form-group">
                                <form onSubmit={ Tambah }>
                                    <div className='mt-3'>
                                        <label>Nilai</label>
                                        <input type="number" className="form-control select2" style={ { width: '100%' } } onChange={ (e) => setInputNilai(e.target.value) } value={ inputNilai } min='0' max='100' maxlength="4" />
                                    </div>
                                    <div className='mt-5 d-flex justify-content-end row container'>
                                        <div className='col-sm-1'>
                                            <button className='btn btn-success'>
                                                Save
                                            </button>
                                        </div>
                                        <div className='col-sm-1'>
                                            <button className='btn btn-warning' onClick={ () => handleBack() }>
                                                Back
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(UtsGanjil)