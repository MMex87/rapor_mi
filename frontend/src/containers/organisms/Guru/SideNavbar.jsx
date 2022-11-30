import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from '../../../api/axios'

const SideNav = (props) => {
    const axiosJWT = axios.create()

    // state data
    const [id_Guru, setIdGuru] = useState('')
    const [kelas, setKelas] = useState([])
    const [mapel, setMapel] = useState([])
    const [nama_kel, setNamaKel] = useState([])


    // get Datas
    const getGuru = async () => {
        try {
            const response = await axiosJWT.get(`/guru/nama/${props.name}`, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
            setIdGuru(response.data.id)
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
            console.log(error)
        }
    }
    const getKelasId = async (val) => {
        try {
            const response = await axiosJWT.get(`/kelas/${val}`, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
            setNamaKel(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    const getMapel = async () => {
        try {
            const response = await axiosJWT.get('/mapel', {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
            setMapel(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const hendleLoad = () => {
        getKelas()
        getGuru()
        getMapel()
    }

    return (
        <div onLoad={ () => hendleLoad() }>
            {/* Main Sidebar Container */ }
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */ }
                <Link to="/dashboard" className="brand-link">
                    <img src="http://localhost:8076/assets/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={ { opacity: '.8' } } />
                    <span className="brand-text font-weight-light">{ props.role } MIDU</span>
                </Link>
                {/* Sidebar */ }
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */ }
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex flex-column container">
                        <div className="image">
                            <img src={ 'http://localhost:8076/assets/uploads/' + props.picture } className="img-circle justify-content-center" style={ { width: 200 } } alt="User Image" />
                        </div>
                        <div className="info container">
                            <Link to={ "/profile" } className="d-flex justify-content-center">{ props.name }</Link>
                        </div>
                        <div className="info container">
                            <span className='d-flex justify-content-center'>{ props.role }</span>
                        </div>
                    </div>
                    {/* SidebarSearch Form */ }
                    <div className="form-inline">
                        <div className="input-group" data-widget="sidebar-search">
                            <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-sidebar">
                                    <i className="fas fa-search fa-fw" />
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Sidebar Menu */ }
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                            <li className="nav-item">
                                <Link className="nav-link" to={ '/dashboardGuru' }>
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p>
                                        Dashboard
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                { (props.role == 'Wali Kelas') ? (
                                    <Link className="nav-link" to={ '/kepala/dashboard' }>
                                        <i className="fa-sharp fa-solid fa-chalkboard-user nav-icon"></i>
                                        { kelas.filter(({ id_guru }) => id_guru.toString() == id_Guru.toString()).map((val, index) => (
                                            <p key={ index }>
                                                Kelas { val.nama_kelas }
                                            </p>
                                        )) }
                                    </Link>

                                ) : '' }
                            </li>
                            { mapel.filter(({ idGuru }) => idGuru.toString() == id_Guru.toString()).map((val, index) => (
                                <li className="nav-item" key={ index }>
                                    <Link to={ `/UserGuru/nilai/${val.id}` } className="nav-link">
                                        <i className="fa-solid fa-book-open nav-icon"></i>
                                        { val.nama } - { kelas.filter(({ id }) => id.toString() == val.id_kelas.toString()).map((value, index) => (
                                            <p key={ index }>
                                                { value.nama_kelas }
                                            </p>
                                        )) }
                                    </Link>
                                </li>

                            )) }
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */ }
                </div>
                {/* /.sidebar */ }
            </aside >
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        name: state.user,
        token: state.token,
        expired: state.expired,
        picture: state.picture,
        role: state.role
    }
}

// export default SideNav

export default connect(mapStateToProps)(SideNav)