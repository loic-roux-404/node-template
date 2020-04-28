import mysql from 'mysql'
import DbAuth from './database'
import Routing from './routing'

export default {
    Routing: Routing,
    Db: mysql.createConnection(DbAuth)
}