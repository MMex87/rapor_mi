import React from 'react'
import { connect } from 'react-redux'

const api = (props) => {

    const getKelas = async () => {
        try {
            const response = await axiosJWT.get('http://localhost:7000/kelas', {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
            return (response.data)
        } catch (error) {
            console.error(error);
        }
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(api)