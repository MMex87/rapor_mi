import React, { useEffect, useState } from 'react'
import axios from '../../../../api/axios'
import jwt_decode from 'jwt-decode'
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import ActionType from '../../../../redux/reducer/globalActionType'

import Swal from 'sweetalert2'

export const RaporUasGanjil = (props) => {
    // alert
    const Toast = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    // Deklarasi axios dan lain"
    const axiosJWT = axios.create()
    const params = useParams()
    const date = new Date()
    const Angkatan = `${date.getFullYear()}/${date.getFullYear() + 1}`


    // state data
    const [siswa, setSiswa] = useState([])
    const [rapor, setRapor] = useState([])

    // state
    const [handle, setHandle] = useState(false)
    const Semester = 'Ganjil'
    const Jenis_rapor = 'UAS'


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
    // const handleData = async () => {
    //     try {
    //         const responseKelas = await axiosJWT.get(`/kelas/${params.idKelas}`, {
    //             headers: {
    //                 Authorization: `Bearer ${props.token}`
    //             }
    //         })
    //         setNamaKelas(responseKelas.data.nama_kelas)

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

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
        const response = await axiosJWT.get(`/rapor`, {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        })
        setRapor(response.data)
    }

    // handle all Generate Raport
    const hanldeAllRapor = async () => {
        try {
            Toast.fire({
                title: 'Apa Kamu Yakin?',
                text: `Kamu akan Mengenerate semua Data Raport!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ok, Generate!',
                cancelButtonText: 'Tidak, Batal!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    Toast.fire(
                        'Tergenerate!',
                        `Data berhasil Tergenerate.`,
                        'success'
                    ).then((res) => {
                        if (res.isConfirmed)
                            setHandle(false)
                    })
                    const nSiswa = siswa.filter(({ id_kelas }) => id_kelas == params.idKelas).length
                    const dataSiswa = siswa.filter(({ id_kelas }) => id_kelas == params.idKelas)
                    for (let i = 0; i < nSiswa; i++) {
                        const dataRapor = rapor.filter(({ id_kelas, semester, jenis_rapor, id_siswa, angkatan }) => id_kelas == params.idKelas && semester == Semester && jenis_rapor == Jenis_rapor && id_siswa == dataSiswa[i]['id'] && angkatan == Angkatan)
                        if (!dataRapor[0]) {
                            axios.post(`/rapor`, {
                                angkatan: Angkatan,
                                semester: Semester,
                                jenis_rapor: Jenis_rapor,
                                id_kelas: params.idKelas,
                                id_siswa: dataSiswa[i]['id']
                            })
                        }
                        // console.log(dataRapor[0])
                    }
                    setHandle(true)
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    Toast.fire(
                        'Dibatalkan',
                        `Data Belum Tergenerate :)`,
                        'error'
                    )
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

    // handle Generate Raport
    const handleRapor = async (id_siswa, id_kelas) => {
        try {
            Toast.fire({
                title: 'Apa Kamu Yakin?',
                text: `Kamu akan Mengenerate Data Raport!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ok, Generate!',
                cancelButtonText: 'Tidak, Batal!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    Toast.fire(
                        'Tergenerate!',
                        `Data berhasil Tergenerate.`,
                        'success'
                    ).then((res) => {
                        if (res.isConfirmed)
                            setHandle(false)
                    })
                    axios.post(`/rapor`, {
                        angkatan: Angkatan,
                        semester: Semester,
                        jenis_rapor: Jenis_rapor,
                        id_kelas,
                        id_siswa
                    })
                    setHandle(true)
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    Toast.fire(
                        'Dibatalkan',
                        `Data Belum Tergenerate :)`,
                        'error'
                    )
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    // const nSiswa = siswa.filter(({ id_kelas }) => id_kelas == params.idKelas)
    // console.log(nSiswa[0]['id']);
    useEffect(() => {
        refreshToken()
        // handleData()
        getSiswa()
        getRapor()
    }, [handle == true])

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
        <>
            <div className="card-header row ">
                <h3 className="card-title col-sm-4">Daftar Siswa UAS Ganjil</h3>
                <div className='col-sm-7 d-flex justify-content-end'>
                    {
                        (
                            siswa.filter(({ id_kelas }) => id_kelas == params.idKelas).length ==
                            rapor.filter(({ id_kelas, semester, jenis_rapor, angkatan }) => id_kelas == params.idKelas && semester == Semester && jenis_rapor == Jenis_rapor && angkatan == Angkatan).length
                        )
                            ?
                            ''
                            :
                            <button className='btn btn-sm btn-primary' onClick={ () => hanldeAllRapor() }>Generate All</button>

                    }
                </div>
                <div className="col-sm-1 d-flex justify-content-end">
                    <div className="card-tools">
                        <button type="button" className="btn btn-tool " data-card-widget="collapse">
                            <i className="fas fa-minus" />
                        </button>
                    </div>
                    <div className="card-tools me-5">
                        <button type="button" className="btn btn-tool" data-card-widget="remove"><i className="fas fa-times" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="card-body table-responsive p-0">
                <table className="table table-hover table-dark text-nowrap" >
                    <thead>
                        <tr className='container'>
                            <th>No</th>
                            <th>NIS</th>
                            <th>NISN</th>
                            <th>Nama Siswa</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        { siswa.filter(({ id_kelas }) => id_kelas == params.idKelas).map((val, index) => (
                            <tr key={ index }>
                                <td>{ index + 1 }</td>
                                <td>{ val.nis }</td>
                                <td>{ val.nisn }</td>
                                <td>{ val.nama }</td>
                                <td className='d-flex justify-content-around'>
                                    { rapor.find(({ id_siswa, id_kelas, semester, jenis_rapor, angkatan }) => id_siswa == val.id && id_kelas == val.id_kelas && semester == Semester && jenis_rapor == Jenis_rapor && angkatan == Angkatan) == null
                                        ?
                                        <div className='me-5'>
                                            <button className='btn btn-primary' onClick={ () => handleRapor(val.id, val.id_kelas) }>Generate Nilai</button>
                                        </div>
                                        :
                                        <div className='me-5'>
                                            <Link className='btn btn-success' to={ `/UserGuru/WaliKelas/${params.idKelas}/${val.id}/${Semester}/${Jenis_rapor}` }>Detail Nilai</Link>
                                        </div>

                                    }
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </div>
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(RaporUasGanjil)