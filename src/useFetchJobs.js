import { useEffect, useReducer } from 'react'
import axios from 'axios'

const get_request_options = (page, params, cnclToken) => ({
    method: 'GET',
    url: 'https://job-search4.p.rapidapi.com/lawjobs/search',
    cancelToken: cnclToken.token,
    params: { query: params.description, page: page.toString(), ...params },
    headers: {
        'x-rapidapi-host': 'job-search4.p.rapidapi.com',
        'x-rapidapi-key': '0fc62a74dcmsh11146c05c4f52f9p129a16jsnae404d55df02'
    }
})

const ACTIONS = {
    MAKE_REQUEST: 'MAKE_REQUEST',
    GET_DATA: 'GET_DATA',
    ERROR: 'ERROR',
    HAS_NEXT_PAGE: 'HAS NEXT PAGE'
}

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { loading: true, jobs: [] }
        case ACTIONS.GET_DATA:
            return { ...state, loading: false, jobs: action.playload.jobs, hasNextPage: false }
        case ACTIONS.ERROR:
            return { ...state, loading: false, error: action.playload.error, jobs: [], hasNextPage: false }
        case ACTIONS.HAS_NEXT_PAGE:
            return { ...state, hasNextPage: action.playload.hasNextPage }
        default:
            return state
    }
}

function useFetchJobs(params, page) {
    const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true })
    const cancelToken1 = axios.CancelToken.source()

    useEffect(() => {
        dispatch({ type: ACTIONS.MAKE_REQUEST })
        axios.request(get_request_options(page, params, cancelToken1)).then(res => {
            dispatch({ type: ACTIONS.GET_DATA, playload: { jobs: res.data.jobs } })
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: ACTIONS.ERROR, playload: { error: e } })
        })

        const cancelToken2 = axios.CancelToken.source()
        axios.request(get_request_options(page + 1, params, cancelToken2)).then(res => {
            console.log('has seconde paggeeee')
            dispatch({ type: ACTIONS.HAS_NEXT_PAGE, playload: { hasNextPage: true } })
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: ACTIONS.ERROR, playload: { error: e } })
        })


        return () => {
            cancelToken1.cancel();
            cancelToken2.cancel();
        }
    }, [params, page])

    return state
}

export default useFetchJobs
