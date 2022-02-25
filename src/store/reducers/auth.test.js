import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe("auth reducer", () => {
    it("should initialize state with defaults", () => {
        expect(reducer(undefined, {})).toEqual({
            userId: null,
            tokenId: null,
            loading: false,
            error: null,
            authRedirect: "/"
        })
    })

    it("should initialize token passed", () => {
        expect(reducer({
            userId: null,
            tokenId: null,
            loading: false,
            error: null,
            authRedirect: "/"
        }, {
            type: actionTypes.AUTH_SUCCESS,
            userId: 'test_user_id',
            tokenId: 'test_token_id'
        })).toEqual({
            userId: 'test_user_id',
            tokenId: 'test_token_id',
            loading: false,
            error: null,
            authRedirect: "/"
        })
    })
})