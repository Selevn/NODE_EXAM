const express = require('express')

const app = express();

app.use('/', express.static('public'))

app.use((_1,_2,next)=>{
    console.log('Here')
    next()
})

app.listen(3000)