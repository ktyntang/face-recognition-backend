const handleSignIn = (req,res,db,bcrypt) => {
    const {email, password} = req.body
    if (!email || !password) {
        console.log(res)
        return res.status(400).json('invalid submission.')
      } else {
    db.select('email','hash').from('login').where('email', email)
    .then(data => {
        const passwordMatch = bcrypt.compareSync(password, data[0].hash);
        if (passwordMatch){
            return db.select('*').from('users').where('email',email)
            .then(user=>res.json(user[0]))
            .catch(err=>res.status(400).json('unable to get user'))
        } else {
            res.status(400).json('wrong username or password. please try again.')
        }})
    .catch(err=>res.status(400).json('wrong username or password. please try again.'))
}}

module.exports = {handleSignIn}