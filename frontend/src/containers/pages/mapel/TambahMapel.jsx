import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'


const TambahMapel = (props) => {
    const [nama, setMapel] = useState('')
    const [induk, setInduk] = useState('')
    const [idGuru, setGuru] = useState('')

    const [msg, setMsg] = useState('')
    const navigate = useNavigate()


    const Tambah = async (e) => {
        e.preventDefault()
        try {
            if (nama === '' || induk === '' || idGuru === '') {
                setMsg('Tolong Isi dengan Lengkap')
            }
            else {
                setMsg('')
                await axios.post('http://localhost:7000/mapel', {
                    nama, induk, idGuru
                })
                navigate('/mapel')
            }
        } catch (err) {
            setMsg(err.response.data.msg)
        }
    }
    return (
        <div>
            <div className="content-wrapper">
                {/* Content Header (Page header) */ }
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Mata Pelajaran</h1>
                            </div>{/* /.col */ }
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Mapel</li>
                                </ol>
                            </div>{/* /.col */ }
                        </div>{/* /.row */ }
                    </div>{/* /.container-fluid */ }
                </div>
                {/* /.content-header */ }
                <div className="container-fluid">
                    {/* /.row */ }
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header row">
                                    <h3 className="card-title col-4">Tambah Mapel</h3>
                                    <div className="col-6"></div>
                                    <div className="col-2 d-flex justify-content-end">
                                        <Link type='button' className='btn btn-warning btn-sm' to={ '/mapel' }>
                                            Kembali <i class="fa-solid fa-rotate-left"></i>
                                        </Link>
                                    </div>
                                </div>
                                {/* /.card-header */ }
                                <div className="card-body table-responsive p-2">
                                    <div className="col-md-10">
                                        <div className="form-group">
                                            <form onSubmit={ Tambah }>
                                                <div>
                                                    <b className='text text-danger'>{ msg }</b>
                                                </div>
                                                <div>
                                                    <label>Nama Mapel</label>
                                                    <select className="form-control select2" style={ { width: '100%' } } onChange={ (e) => setMapel(e.target.value) }>
                                                        <option selected="selected" value={ '' }>-- Pilih Mapel --</option>
                                                        <option value={ 'Bahasa Indonesia' }>Bahasa Indonesia</option>
                                                        <option value={ 'Matematika' }>Matematika</option>
                                                        <option value={ 'IPA' }>IPA</option>
                                                        <option value={ 'Bahasa Arab' }>Bahasa Arab</option>
                                                    </select>
                                                </div>
                                                <div className='mt-3'>
                                                    <label>Induk</label>
                                                    <select className="form-control select2" style={ { width: '100%' } } onChange={ (e) => setInduk(e.target.value) }>
                                                        <option selected="selected" value={ '' }>-- Pilih Induk --</option>
                                                        <option value={ 'National' }>National</option>
                                                        <option value={ 'Muatan Lokal' }>Muatan Lokal</option>
                                                    </select>
                                                </div>
                                                <div className='mt-3'>
                                                    <label>Nama Guru</label>
                                                    <select className="form-control select2" style={ { width: '100%' } } onChange={ (e) => setGuru(e.target.value) }>
                                                        <option selected="selected" value={ '' }>-- Pilih Guru --</option>
                                                        <option value={ 1 }>Pak Rofiq</option>
                                                        <option value={ 2 }>Bu ida</option>
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
                                {/* /.card-body */ }
                            </div>
                            {/* /.card */ }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        name: state.name,
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

export default connect(mapStateToProps, mapDispatchToProps)(TambahMapel)
