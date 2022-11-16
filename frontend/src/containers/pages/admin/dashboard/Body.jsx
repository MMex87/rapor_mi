import React, { useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import refreshToken from '../../../config/token/refreshToken'

const BodyDashboard = () => {
    const [name, setName] = useState('')
    const [token, setToken] = useState('')
    const [expired, setExpired] = useState('')
    const [users, setUsers] = useState([])

    useEffect(() => {
        refreshToken(),
            getUser()
    }, [])


    const axiosJWT = axios.create()

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date()
        if (expired * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:7000/token')
            config.headers.Authorization = `Bearer ${response.data.accessToken}`
            setToken(response.data.accessToken)
            const decoded = jwt_decode(response.data.accessToken)
            setName(decoded.name)
            setExpired(decoded.exp)
        }
        return config
    }, (error) => {
        return Promise.reject(error)
    })

    const getUser = async () => {
        const response = await axiosJWT.get('http://localhost:7000/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setUsers(response.data)
    }

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
                                    <span className="info-box-icon bg-info elevation-1"><i className="fas fa-cog" /></span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">CPU Traffic</span>
                                        <span className="info-box-number">
                                            10
                                            <small>%</small>
                                        </span>
                                    </div>
                                    {/* /.info-box-content */ }
                                </div>
                                {/* /.info-box */ }
                            </div>
                            {/* /.col */ }
                            <div className="col-12 col-sm-6 col-md-3">
                                <div className="info-box mb-3">
                                    <span className="info-box-icon bg-danger elevation-1"><i className="fas fa-thumbs-up" /></span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">Likes</span>
                                        <span className="info-box-number">41,410</span>
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
                                    <span className="info-box-icon bg-success elevation-1"><i className="fas fa-shopping-cart" /></span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">Sales</span>
                                        <span className="info-box-number">760</span>
                                    </div>
                                    {/* /.info-box-content */ }
                                </div>
                                {/* /.info-box */ }
                            </div>
                            {/* /.col */ }
                            <div className="col-12 col-sm-6 col-md-3">
                                <div className="info-box mb-3">
                                    <span className="info-box-icon bg-warning elevation-1"><i className="fas fa-users" /></span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">New Members</span>
                                        <span className="info-box-number">2,000</span>
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








    {/* // <div className='container-fluid mt-5 ms-5'>
        //     <h1 className='mt-5'>Welcome Back : { name }</h1>
        //     <button onClick={ getUser } className='button is-info'>Get Users</button>
        //     <table className='table-striped'>
        //         <thead>
        //             <tr>
        //                 <th scope="col">no</th>
        //                 <th scope="col">name</th>
        //                 <th scope="col">email</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             { users.map((user, index) => (
        //                 <tr key={ user.id }>
        //                     <th scope="row">{ index + 1 }</th>
        //                     <td>{ user.name }</td>
        //                     <td>{ user.email }</td>
        //                 </tr>

        //             )) }
        //         </tbody>
        //     </table>
        // </div>
    ) */}
}

export default BodyDashboard