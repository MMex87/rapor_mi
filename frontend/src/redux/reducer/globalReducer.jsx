import ActionType from "./globalActionType";

const globalState = {
    user: '',
    token: '',
    expired: '',
    picture: ''
}

const rootReducer = (state = globalState, action) => {
    switch (action.type) {
        case ActionType.SET_NAME_USER:
            return {
                ...state,
                user: action.index
            }
        case ActionType.SET_TOKEN_USER:
            return {
                ...state,
                token: action.index
            }
        case ActionType.SET_EXPIRED_USER:
            return {
                ...state,
                expired: action.index
            }
        case ActionType.SET_PICTURE_USER:
            return {
                ...state,
                picture: action.index
            }
        default:
            return state
    }
}

export default rootReducer