import React, { useEffect, useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import ActionType from '../../../redux/reducer/globalActionType'

const Dashboard = (props) => {

    const navigate = useNavigate()

    const [users, setUsers] = useState()

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:7000/token')
            const decoded = jwt_decode(response.data.accessToken)
            const token = response.data.accessToken
            props.handleToken(token)
            props.handleName(decoded.name)
            props.handleExp(decoded.exp)

        } catch (error) {
            return navigate('/')
            // return error
        }
    }

    useEffect(() => {
        refreshToken()
        getUser()
    }, [])

    // console.log(props.expired);
    // console.log(props.name);

    const axiosJWT = axios.create()

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date()
        if (props.expired * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:7000/token')
            config.headers.Authorization = `Bearer ${response.data.accessToken}`
            props.handleToken(response.data.accessToken)
            const decoded = jwt_decode(response.data.accessToken)
            props.handleExp(decoded.exp)
            props.handleName(decoded.name)
        }
        return config
    }, (error) => {
        return Promise.reject(error)
    })

    const getUser = async () => {
        const response = await axiosJWT.get('http://localhost:7000/users', {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        })
        setUsers(response.data)
    }

    console.log(users);


    // console.log(props.token);
    // console.log(props.name);
    // console.log(props.exp);

    return (
        <div>
            {/* &lt; !--Content Wrapper.Contains page content-- &gt; */ }
            <div className="content-wrapper">
                {/* Content Header (Page header) */ }
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Dashboard</h1>
                            </div>{/* /.col */ }
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Dashboard</li>
                                </ol>
                            </div>{/* /.col */ }
                        </div>{/* /.row */ }
                    </div>{/* /.container-fluid */ }
                </div>
                {/* /.content-header */ }
                {/* Main content */ }
                <section className="content">
                    <div className="container-fluid">
                        {/* Info boxes */ }
                        <div className="row">
                            <div className="col-12 col-sm-6 col-md-3">
                                <div className="info-box">
                                    <span className="info-box-icon bg-info elevation-1"><i className="fa-solid fa-graduation-cap" /></span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">Siswa</span>
                                        <span className="info-box-number">
                                            380
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
                                        <span className="info-box-number">12</span>
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
                                        <span className="info-box-number">33</span>
                                    </div>
                                    {/* /.info-box-content */ }
                                </div>
                                {/* /.info-box */ }
                            </div>
                            {/* /.col */ }
                            <div className="col-12 col-sm-6 col-md-3">
                                <div className="info-box mb-3">
                                    <span className="info-box-icon bg-warning elevation-1"><i className="fa-solid fa-book-open-reader" /></span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">Rata-Rata Nilai</span>
                                        <span className="info-box-number">8.5</span>
                                    </div>
                                    {/* /.info-box-content */ }
                                </div>
                                {/* /.info-box */ }
                            </div>
                            {/* /.col */ }
                        </div>
                        {/* /.row */ }
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title text-light">Monthly Recap Report</h5>
                                        <div className="card-tools">
                                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                                <i className="fas fa-minus" />
                                            </button>
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-tool dropdown-toggle" data-toggle="dropdown">
                                                    <i className="fas fa-wrench" />
                                                </button>
                                                <div className="dropdown-menu dropdown-menu-right" role="menu">
                                                    <a href="#" className="dropdown-item">Action</a>
                                                    <a href="#" className="dropdown-item">Another action</a>
                                                    <a href="#" className="dropdown-item">Something else here</a>
                                                    <a className="dropdown-divider" />
                                                    <a href="#" className="dropdown-item">Separated link</a>
                                                </div>
                                            </div>
                                            <button type="button" className="btn btn-tool" data-card-widget="remove">
                                                <i className="fas fa-times" />
                                            </button>
                                        </div>
                                    </div>
                                    {/* /.card-header */ }
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <p className="text-center">
                                                    <strong className='text-light'>Sales: 1 Jan, 2014 - 30 Jul, 2014</strong>
                                                </p>
                                                <div className="chart">
                                                    {/* Sales Chart Canvas */ }
                                                    <canvas id="salesChart" height={ 180 } style={ { height: 180 } } />
                                                </div>
                                                {/* /.chart-responsive */ }
                                            </div>
                                            {/* /.col */ }
                                            <div className="col-md-4">
                                                <p className="text-center">
                                                    <strong>Goal Completion</strong>
                                                </p>
                                                <div className="progress-group">
                                                    Add Products to Cart
                                                    <span className="float-right"><b>160</b>/200</span>
                                                    <div className="progress progress-sm">
                                                        <div className="progress-bar bg-primary" style={ { width: '80%' } } />
                                                    </div>
                                                </div>
                                                {/* /.progress-group */ }
                                                <div className="progress-group">
                                                    Complete Purchase
                                                    <span className="float-right"><b>310</b>/400</span>
                                                    <div className="progress progress-sm">
                                                        <div className="progress-bar bg-danger" style={ { width: '75%' } } />
                                                    </div>
                                                </div>
                                                {/* /.progress-group */ }
                                                <div className="progress-group">
                                                    <span className="progress-text">Visit Premium Page</span>
                                                    <span className="float-right"><b>480</b>/800</span>
                                                    <div className="progress progress-sm">
                                                        <div className="progress-bar bg-success" style={ { width: '60%' } } />
                                                    </div>
                                                </div>
                                                {/* /.progress-group */ }
                                                <div className="progress-group">
                                                    Send Inquiries
                                                    <span className="float-right"><b>250</b>/500</span>
                                                    <div className="progress progress-sm">
                                                        <div className="progress-bar bg-warning" style={ { width: '50%' } } />
                                                    </div>
                                                </div>
                                                {/* /.progress-group */ }
                                            </div>
                                            {/* /.col */ }
                                        </div>
                                        {/* /.row */ }
                                    </div>
                                    {/* ./card-body */ }
                                    <div className="card-footer">
                                        <div className="row">
                                            <div className="col-sm-3 col-6">
                                                <div className="description-block border-right">
                                                    <span className="description-percentage text-success"><i className="fas fa-caret-up" /> 17%</span>
                                                    <h5 className="description-header">$35,210.43</h5>
                                                    <span className="description-text">TOTAL REVENUE</span>
                                                </div>
                                                {/* /.description-block */ }
                                            </div>
                                            {/* /.col */ }
                                            <div className="col-sm-3 col-6">
                                                <div className="description-block border-right">
                                                    <span className="description-percentage text-warning"><i className="fas fa-caret-left" /> 0%</span>
                                                    <h5 className="description-header">$10,390.90</h5>
                                                    <span className="description-text">TOTAL COST</span>
                                                </div>
                                                {/* /.description-block */ }
                                            </div>
                                            {/* /.col */ }
                                            <div className="col-sm-3 col-6">
                                                <div className="description-block border-right">
                                                    <span className="description-percentage text-success"><i className="fas fa-caret-up" /> 20%</span>
                                                    <h5 className="description-header">$24,813.53</h5>
                                                    <span className="description-text">TOTAL PROFIT</span>
                                                </div>
                                                {/* /.description-block */ }
                                            </div>
                                            {/* /.col */ }
                                            <div className="col-sm-3 col-6">
                                                <div className="description-block">
                                                    <span className="description-percentage text-danger"><i className="fas fa-caret-down" /> 18%</span>
                                                    <h5 className="description-header">1200</h5>
                                                    <span className="description-text">GOAL COMPLETIONS</span>
                                                </div>
                                                {/* /.description-block */ }
                                            </div>
                                        </div>
                                        {/* /.row */ }
                                    </div>
                                    {/* /.card-footer */ }
                                </div>
                                {/* /.card */ }
                            </div>
                            {/* /.col */ }
                        </div>
                        {/* /.row */ }
                    </div>
                </section>
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


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
// export default Dashboard