import app from "./config";

app.listen(app.get('PORT'), ()=>{
    console.log(`Server started at port ${app.get('PORT')}`)
})

