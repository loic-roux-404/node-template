import mysql from 'mysql'
import DbAuth from './database'
import bootstrap from './bootstrap'

export const 
    Router =  bootstrap.Router,
    Container =  bootstrap.Container,
    Db = mysql.createConnection(DbAuth)
