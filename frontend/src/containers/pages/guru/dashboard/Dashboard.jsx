import React, { useEffect, useState } from 'react'
import axios from '../../../../api/axios'
import jwt_decode from 'jwt-decode'
import { useNavigate, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ActionType from '../../../../redux/reducer/globalActionType'
import ReactPaginate from 'react-paginate'

const Dashboard = (props) => {
    const navigate = useNavigate()

    const axiosJWT = axios.create()

    // state Datas
    const [users, setUsers] = useState([])
    const [siswa, setSiswa] = useState([])
    const [siswaCount, setSiswaCount] = useState([])
    const [kelas, setKelas] = useState([])
    const [guru, setGuru] = useState([])
    const [nilai, setNilai] = useState([])
    const [rapor, setRapor] = useState([])

    // state
    const [idKelas, setIdKelas] = useState('')

    // state Pagination dan search
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(5)
    const [pages, setPages] = useState(0)
    const [rows, setRows] = useState(0)

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

    const getSiswa = async () => {
        try {
            const response = await axiosJWT.get(`/siswa`, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
            setSiswaCount(response.data)
        } catch (error) {
            console.error(error);
        }
    }
    const getKelas = async () => {
        try {
            const response = await axiosJWT.get('/kelas', {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
            setKelas(response.data)
        } catch (error) {
            console.error(error);
        }
    }
    const getGuru = async () => {
        try {
            const response = await axiosJWT.get(`/guru`, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
            setGuru(response.data)
        } catch (error) {
            console.error(error);
        }
    }
    const getUser = async () => {
        const response = await axiosJWT.get('/users', {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        })
        setUsers(response.data)
    }
    const getData = async () => {
        try {
            const response = await axiosJWT.get(`/guru/nama/${props.name}`, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
            const responseKelas = await axiosJWT.get(`/kelasGuru/${response.data.id}`, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
            setIdKelas(responseKelas.data.id)
            const responseSiswa = await axiosJWT.get(`/siswaPage?limit=${limit}&page=${page}&idKelas=${responseKelas.data.id}`, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
            setSiswa(responseSiswa.data.result)
            setPage(responseSiswa.data.page)
            setPages(responseSiswa.data.totalPage)
            setRows(responseSiswa.data.totalRows)
        } catch (error) {
            console.error(error);
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
    const getRapor = async () => {
        try {
            const response = await axiosJWT.get('/rapor', {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
            setRapor(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    // handel Pagenation
    const changePage = ({ selected }) => {
        setPage(selected)
    }


    useEffect(() => {
        refreshToken()
        getUser()
        getSiswa()
        getGuru()
        getKelas()
        getData()
        getNilai()
        getRapor()
    }, [props.token, page])

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
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Dashboard</h1>
                            </div>{/* /.col */ }
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item active">Dashboard</li>
                                </ol>
                            </div>{/* /.col */ }
                        </div>{/* /.row */ }
                    </div>{/* /.container-fluid */ }
                </div>
                {/* /.content-header */ }
                {/* Main content */ }
                <div className="container-fluid">
                    {/* Info boxes */ }
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="info-box">
                                <span className="info-box-icon bg-info elevation-1"><i className="fa-solid fa-graduation-cap" /></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Siswa</span>
                                    <span className="info-box-number">
                                        { siswaCount.length }
                                    </span>
                                </div>
                                {/* /.info-box-content */ }
                            </div>
                            {/* /.info-box */ }
                        </div>
                        {/* /.col */ }
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="info-box mb-3">
                                <span className="info-box-icon bg-danger elevation-1"><i className="fa-solid fa-school-flag" /></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Kelas</span>
                                    <span className="info-box-number">{ kelas.length }</span>
                                </div>
                                {/* /.info-box-content */ }
                            </div>
                            {/* /.info-box */ }
                        </div>
                        {/* /.col */ }
                        {/* fix for small devices only */ }
                        <div className="clearfix hidden-md-up" />
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="info-box mb-3">
                                <span className="info-box-icon bg-success elevation-1"><i className="fa-solid fa-person-chalkboard" /></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Guru</span>
                                    <span className="info-box-number">{ guru.length }</span>
                                </div>
                                {/* /.info-box-content */ }
                            </div>
                            {/* /.info-box */ }
                        </div>
                        {/* /.col */ }
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="info-box mb-3">
                                <span className="info-box-icon bg-warning elevation-1"><i className="fa-sharp fa-solid fa-person"></i></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Admin</span>
                                    <span className="info-box-number">{ users.length }</span>
                                </div>
                                {/* /.info-box-content */ }
                            </div>
                            {/* /.info-box */ }
                        </div>
                        {/* /.col */ }
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header row">
                                        <h3 className="card-title col-4">Data Nilai Terbaru</h3>
                                        <div className="col-6"></div>
                                        <div className="col-2 d-flex justify-content-end">
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
                                        <table className="table table-hover table-dark text-nowrap table-bordered" >
                                            <thead>
                                                <tr className='container'>
                                                    <th rowspan="2" style={ { width: '5%', textAlign: 'center', verticalAlign: 'middle' } }>No</th>
                                                    <th rowspan="2" style={ { width: '40%', textAlign: 'center', verticalAlign: 'middle' } }>Nama Siswa</th>
                                                    <th rowspan="2" style={ { width: '15%', textAlign: 'center', verticalAlign: 'middle' } }>Jenis Nilai</th>
                                                    <th colspan="2" style={ { width: '20%', textAlign: 'center' } }>Pengetahuan</th>
                                                    <th colspan="2" style={ { width: '20%', textAlign: 'center' } }>Keterampilan</th>
                                                </tr>
                                                <tr className='container'>
                                                    <th style={ { width: '7%', textAlign: 'center' } }>Nilai</th>
                                                    <th style={ { width: '13%', textAlign: 'center' } }>Predikat</th>
                                                    <th style={ { width: '7%', textAlign: 'center' } }>Nilai</th>
                                                    <th style={ { width: '13%', textAlign: 'center' } }>Predikat</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { siswa.filter(({ id_kelas }) => id_kelas == idKelas).map((val, index) => (
                                                    <tr key={ index }>
                                                        <td>{ index + 1 }</td>
                                                        <td>{ val.nama }</td>
                                                        <td>
                                                            {
                                                                nilai.filter(({ id_kelas, id_siswa }) => id_kelas == idKelas && id_siswa == val.id).map((value, index) => (
                                                                    <div key={ index }>
                                                                        { value.jenis_rapor + ' ' + value.semester }
                                                                    </div>
                                                                ))
                                                            }
                                                        </td>
                                                        <td style={ { textAlign: 'center' } }>
                                                            {
                                                                nilai.filter(({ id_kelas, id_siswa }) => id_kelas == idKelas && id_siswa == val.id).map((value, index) => (
                                                                    <div key={ index }>
                                                                        { value.nilai }
                                                                    </div>
                                                                ))
                                                            }
                                                        </td>
                                                        <td style={ { textAlign: 'center' } }>
                                                            {
                                                                nilai.filter(({ id_kelas, id_siswa }) => id_kelas == idKelas && id_siswa == val.id).map((value, index) => (
                                                                    <div key={ index }>
                                                                        {
                                                                            (89 < parseInt(value.nilai)) ? ('A') : (79 < parseInt(value.nilai)) ? ('B') : (69 < parseInt(value.nilai)) ? ('C') : ('D')
                                                                        }
                                                                    </div>
                                                                ))
                                                            }
                                                        </td>
                                                        <td style={ { textAlign: 'center' } }>
                                                            {
                                                                nilai.filter(({ id_kelas, id_siswa }) => id_kelas == idKelas && id_siswa == val.id).map((value, index) => (
                                                                    <div key={ index }>
                                                                        { value.nilai_keterampilan }
                                                                    </div>
                                                                ))
                                                            }
                                                        </td>
                                                        <td style={ { textAlign: 'center' } }>
                                                            {
                                                                nilai.filter(({ id_kelas, id_siswa }) => id_kelas == idKelas && id_siswa == val.id).map((value, index) => (
                                                                    <div key={ index }>
                                                                        {
                                                                            (89 < parseInt(value.nilai_keterampilan)) ? ('A') : (79 < parseInt(value.nilai_keterampilan)) ? ('B') : (69 < parseInt(value.nilai_keterampilan)) ? ('C') : ('D')
                                                                        }
                                                                    </div>
                                                                ))
                                                            }
                                                        </td>
                                                    </tr>
                                                )) }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="p-3">
                                        <div className='d-flex justify-content-between'>
                                            <p className='text-center'>Total Siswa : { rows } Page: { rows ? page + 1 : 0 } of { pages }</p>
                                            <nav aria-label="Page navigation example justify-content-end">
                                                <ReactPaginate
                                                    previousLabel={ "< Prev" }
                                                    nextLabel={ "Next >" }
                                                    pageCount={ pages }
                                                    onPageChange={ changePage }
                                                    containerClassName={ 'pagination' }
                                                    pageLinkClassName={ 'page-link' }
                                                    pageClassName={ 'page-item' }
                                                    previousLinkClassName={ 'page-link' }
                                                    previousClassName={ 'page-item' }
                                                    nextClassName={ 'page-item' }
                                                    nextLinkClassName={ 'page-link' }
                                                    activeClassName={ 'active' }
                                                />
                                            </nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
// export default Dashboard