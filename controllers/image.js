const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'ed73da0e40eb44d2ba8151d00347d005'
   });

const handleAPIcall = (req,res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => res.json(data))
        .catch(err => res.status(400).json('error connecting to API'))
}

const handleImage = (req,res,db) =>{
    const {id} = req.body
    db('users').where('id','=',id).increment('entries', 1).returning('*')
    .then(user =>res.json(user[0].entries))
    .catch(err => res.status(400).json('error getting entries'))
}

module.exports = {handleImage,handleAPIcall}