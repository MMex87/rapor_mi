import { connect } from 'react-redux'
import { IconBuild, IconJurnal, IconPerson, IconPerson2 } from '../../components/atoms/icon/Icon.jsx'
import { Link } from 'react-router-dom'

const SideNav = (props) => {
    return (
        <div>
            {/* Main Sidebar Container */ }
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */ }
                <Link to="/dashboard" className="brand-link">
                    <img src="http://localhost:3000/assets/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={ { opacity: '.8' } } />
                    <span className="brand-text font-weight-light">Admin MIDU</span>
                </Link>
                {/* Sidebar */ }
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */ }
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="http://localhost:3000/assets/dist/img/user2-160x160.jpg" className="img-circle elevation-3" alt="User Image" />
                        </div>
                        <div className="info">
                            <a href="#" className="d-block">{ props.name }</a>
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
                                <Link className="nav-link" to={ '/dashboard' }>
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p>
                                        Dashboard
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={ "/siswa" } className="nav-link">
                                    <IconPerson />
                                    <p>
                                        Siswa
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="pages/widgets.html" className="nav-link">
                                    {/* <IconPerson2 /> */ }
                                    <i className="fa-solid fa-chalkboard-user nav-icon"></i>
                                    <p>
                                        Guru
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/mapel">
                                    <IconJurnal />
                                    {/* <i className="nav-icon bi bi-journal" /> */ }
                                    <p>
                                        Mata Pelajaran
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="pages/widgets.html" className="nav-link">
                                    <i className="fa-solid fa-school-flag nav-icon"></i>
                                    {/* <IconBuild /> */ }
                                    <p>
                                        Kelas
                                    </p>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */ }
                </div>
                {/* /.sidebar */ }
            </aside>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        name: state.user
    }
}

// export default SideNav

export default connect(mapStateToProps)(SideNav)