const DB_PORT = process.env.DB_PORT || 27017
const DB_NAME = process.env.DB_NAME || 'nest'

export const DB_CONN = `mongodb://127.0.0.1:${DB_PORT}/${DB_NAME}`


export const jwtTokenSecret = '121212'