const path = require('path')
const express = require('express')
const exp = require('constants')
const hbs = require('hbs')
const getGeoLocation = require('./utils/geolocation')

const app = express()

// path define here
const getpath = path.join(__dirname, '../public')
const getViewpath = path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname,'../template/partials')

app.use(express.static(getpath))
app.set('view engine', 'hbs')
//replacing the default view directory with the new one
app.set('views', getViewpath)
hbs.registerPartials(partialPath)

app.get('/weather', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error:'provide the address'
        })
    }
    getGeoLocation(req.query.search, (err, result) => {
        if(err){
            return res.send({
                error_response: err
            })
        }
        res.send({
            data: result
        })
    })

})

app.get('/',(req, res)=>{
    res.render('home', {
    title:'Weather',
    content: 'Get weather report',
    footerTitle: 'footer section for Home'
    })
})
app.get('/about',(req, res)=>{
    res.render('about', {
    title:'About me',
    content: 'This is About page',
    footerTitle: 'footer section for About'
    })
})
app.get('/help',(req, res)=>{
    res.render('help', {
    title:'Help',
    content: 'This is help page',
    footerTitle: 'footer section for Help'
    })
})
app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: 'Help Error',
        content: 'Help article not found',
        footerTitle: 'Help Error footer'

    })
})
app.get('*', (req, res)=>{
    res.render('404', {
        title: 'Error',
        content: 'Error status 404',
        footerTitle: 'Error footer'

    })
})

app.listen(3000, ()=>{
    console.log('server is started!!!')
})