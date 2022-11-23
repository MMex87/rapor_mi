import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ActionType from '../../../../redux/reducer/globalActionType'
import axios from '../../../../api/axios'
import jwt_decode from 'jwt-decode'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export const user = (props) => {
    // deklarasi hooks dan axios
    const navigate = useNavigate()
    const axiosJWT = axios.create()
    const foto = "http://localhost:3000/assets/uploads/"

    // state get datas
    const [users, setUsers] = useState([])
    const [guru, setGuru] = useState([])

    // Deklarasi password Default
    const pwKepala = 'kepsekmidu'
    const pwadmin = 'adminmidu'
    const pwGuru = 'gurumidu'

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
                return navigate('/kepala/dashboard')
            } else if (decoded.role == "Admin") {
                return navigate('/dashboard')
            }
        } catch (error) {
            return navigate('/')
        }
    }

    // getDatas
    const getUser = async () => {
        const response = await axiosJWT.get('/users', {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        })
        setUsers(response.data)
    }

    const getGuru = async () => {
        const response = await axiosJWT.get('/guru', {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        })
        setGuru(response.data)
    }


    // Handle Tombol
    // handle Hapus Kepala Sekolah

    const hapusKepala = async (val) => {
        try {
            await axios.delete(`/users/${val}`)
            getUser()
        } catch (error) {
            console.log(error)
        }
    }

    //handle reset password Kepala Sekolah
    const resetKepala = async (val, role) => {
        try {
            if (role == 'admin') {
                const password = pwadmin
                const confPassword = pwadmin
                await axios.put(`/users/${val}`, {
                    password, confPassword
                })
                console.log('Berhasil Mereset Password')
            } else {
                const password = pwKepala
                const confPassword = pwKepala
                await axios.put(`/users/${val}`, {
                    password, confPassword
                })
                console.log('Berhasil Mereset Password')
            }
        } catch (error) {
            console.error(error);
        }
    }

    // handle add akun guru
    const handleAkunGuru = async (val) => {
        try {
            const password = pwGuru
            const confPassword = pwGuru
            await axios.put(`/guru/update/${val}`, {
                password, confPassword
            })
            console.log('Berhasil Membuat akun')
            getGuru()
        } catch (error) {
            console.log(error);
        }
    }

    // handle Hapus guru

    const hapusGuru = async (val) => {
        try {
            await axios.delete(`/guru/${val}`)
            getGuru()
        } catch (error) {
            console.log(error)
        }
    }

    //handle reset password guru
    const resetGuru = async (val) => {
        try {

            const password = pwGuru
            const confPassword = pwGuru
            await axios.put(`/guru/update/${val}`, {
                password, confPassword
            })
            console.log('Berhasil Mereset Password')
        } catch (error) {
            console.error(error);
        }
    }


    // Hooks Use Effect
    useEffect(() => {
        refreshToken()
        getUser()
        getGuru()
    }, [])

    // axios Interceptors 
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
                                <h1 className="m-0">User Manage</h1>
                            </div>{/* /.col */ }
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to={ "/dashboard" }>Dashboard</Link></li>
                                    <li className="breadcrumb-item active">User</li>
                                </ol>
                            </div>{/* /.col */ }
                        </div>{/* /.row */ }
                    </div>{/* /.container-fluid */ }
                </div>

                {/* User Kepala Sekolah */ }
                <div className="container-fluid">
                    {/* /.row */ }
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header row">
                                    <h3 className="card-title col-4">User Kepala Sekolah</h3>
                                    <div className="col-6">
                                        <p>Password Default : { pwKepala }</p>
                                    </div>
                                    <div className="col-2 d-flex justify-content-end">
                                        { (users.filter(({ role }) => role.indexOf("Kepala Sekolah") > -1).length > 0) ? (
                                            ''
                                        ) :
                                            <Link type='button' className='btn btn-success btn-sm' to={ `tambah` }>
                                                Tambah <i className="fa-solid fa-plus"></i>
                                            </Link> }
                                    </div>
                                </div>
                                <div className="card-body table-responsive p-0">
                                    <table className="table table-hover table-dark text-nowrap">
                                        <thead>
                                            <tr>
                                                <th>Nama</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>Picture</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { users.filter(({ role }) => role.indexOf("Kepala Sekolah") > -1).map((val, index) => (
                                                <tr key={ index + 1 }>
                                                    <td className='col-sm-3'>{ val.name }</td>
                                                    <td className='col-sm-3'>{ val.email }</td>
                                                    <td className='col-sm-1'>{ val.role }</td>
                                                    <td className='col-sm-3'>
                                                        {
                                                            <div className="w-75 mt-3 mb-3" style={ { marginLeft: 10 } }>
                                                                <img src={ foto + val.picture } className='img-thumbnail'></img>
                                                            </div>
                                                        }
                                                    </td>
                                                    <td className='col-sm-2 container p-2'>
                                                        <div className="row mt-2">
                                                            <button className='btn btn-warning' onClick={ () => { confirm('Apakah anda yakin ingin mereset Password default?') ? resetKepala(val.id, 'kepsek') : '' } }>Reset Password</button>
                                                        </div>
                                                        <div className="row mt-3">
                                                            <button className='btn btn-danger' onClick={ () => { confirm('Apakah anda yakin ingin menghapus?') ? hapusKepala(val.id) : '' } }>Hapus</button>
                                                        </div>
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

                {/* User Admin */ }
                <div className="container-fluid">
                    {/* /.row */ }
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header row">
                                    <h3 className="card-title col-4">User Admin</h3>
                                    <div className="col-6">
                                        <p>Password Default : { pwadmin }</p>
                                    </div>
                                    <div className="col-2 d-flex justify-content-end">
                                        <Link type='button' className='btn btn-success btn-sm' to={ `tambahAdmin` }>
                                            Tambah <i className="fa-solid fa-plus"></i>
                                        </Link>
                                    </div>
                                </div>
                                <div className="card-body table-responsive p-0">
                                    <table className="table table-hover table-dark text-nowrap">
                                        <thead>
                                            <tr>
                                                <th>Nama</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>Picture</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { users.filter(({ role }) => role.indexOf("Admin") > -1).map((val, index) => (
                                                <tr key={ index + 1 }>
                                                    <td className='col-3'>{ val.name }</td>
                                                    <td className='col-3'>{ val.email }</td>
                                                    <td className='col-1'>{ val.role }</td>
                                                    <td className='col-3'>
                                                        {
                                                            <div className="w-75 mt-3 mb-3" style={ { marginLeft: 10 } }>
                                                                <img src={ foto + val.picture } className='img-thumbnail'></img>
                                                            </div>
                                                        }
                                                    </td>
                                                    <td className='col-2 container p-2'>
                                                        <div className="row mt-2">
                                                            <button className='btn btn-warning' onClick={ () => { confirm('Apakah anda yakin ingin mereset Password default?') ? resetKepala(val.id, 'admin') : '' } }>Reset Password</button>
                                                        </div>
                                                        <div className="row mt-3">
                                                            <button className='btn btn-danger' onClick={ () => { confirm('Apakah anda yakin ingin menghapus?') ? hapusKepala(val.id) : '' } }>Hapus</button>
                                                        </div>
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

                {/* user Guru */ }
                <div className="container-fluid">
                    {/* /.row */ }
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header row">
                                    <h3 className="card-title col-4">User Guru</h3>
                                    <div className="col-6"> <p>Password Default : { pwGuru }</p></div>
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
                                                <th>Nama</th>
                                                <th>nuptk</th>
                                                <th>Role</th>
                                                <th>Picture</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { guru.map((val, index) => (
                                                <tr key={ index + 1 }>
                                                    <td className='col-sm-3'>{ val.nama }</td>
                                                    <td className='col-sm-3'>{ val.nuptk }</td>
                                                    <td className='col-sm-1'>{ val.role }</td>
                                                    <td className='col-sm-3'>
                                                        {
                                                            <div className="w-75 mt-3 mb-3" style={ { marginLeft: 10 } }>
                                                                <img src={ foto + val.picture } className='img-thumbnail'></img>
                                                            </div>
                                                        }
                                                    </td>
                                                    <td className='col-sm-2'>
                                                        { (val.password == null) &&
                                                            <div div className="row mt-2">
                                                                <button className='btn btn-success' onClick={ () => { confirm('Apakah anda yakin ingin menjadikan akun Guru?') ? handleAkunGuru(val.id) : '' } }>Add Account</button>
                                                            </div>
                                                        }
                                                        <div className="row mt-3">
                                                            <button className='btn btn-warning' onClick={ () => { confirm('Apakah anda yakin ingin mereset Password default?') ? resetGuru(val.id) : '' } }>Reset Password</button>
                                                        </div>
                                                        <div className="row mt-3">
                                                            <button className='btn btn-danger' onClick={ () => { confirm('Apakah anda yakin ingin menghapus?') ? hapusGuru(val.id) : '' } }>Hapus</button>
                                                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(user)