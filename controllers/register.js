handleRegister = (req,res,db,bcrypt) => {
    const {name,email,password} = req.body
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    if (!name || !email || !password) {
      return res.status(400).json('invalid submission.')
    } else {
      db.transaction(trx => {
        trx.insert({
            hash:hash,
            email:email})
          .into('login')
          .returning('email')
          .then(loginEmail => {
            trx.insert({
                name: name,
                email: loginEmail[0].email,
                joined: new Date()
            })
            .into('users')
            .returning('*')
            .then(user =>res.json(user[0]))
        })
        .then(trx.commit)
        .catch(trx.rollback);
      })
    .catch((err)=>res.status(400).json('unable to register. please contact support.'))
    }    
}

module.exports = {handleRegister}