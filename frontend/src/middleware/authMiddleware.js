import ls from 'local-storage'

const getHeaders = () => {
    return {
        'x-auth-token': ls.get('token')
    }
}

export {
    getHeaders
}