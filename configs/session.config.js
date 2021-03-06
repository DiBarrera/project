const session     =     require('express-session')
const MongoStore  =     require('connect-mongo')(session)
const mongoose    =     require('mongoose')

// const sessionManagement = () => {
// }
// module.exports = sessionManagement

module.exports = app => {
  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: true,
      saveUninitialized: false,
      secret: "holamundo",
      cookie: {
        sameSite: false,
        httpOnly: true,
        maxAge: 86400000
      },
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 60 * 60 * 24 // 60sec * 60min * 24h => 1 day
      })            
    })
  )
}