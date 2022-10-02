const handleProfileGET =(req,res,db) => {
    const {id} = req.params
    db.select('*').from('users').where({'id':id})
    .then(user =>{
        return user.length ? res.json(user[0]) :  res.status(400).json('user not found.')
    })
    .catch(err => res.status(400).json('error getting user profile.'))
}

module.exports = {handleProfileGET}