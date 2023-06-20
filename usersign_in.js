var express =require("express")
var router = express.Router()
var bodyparser = require("body-parser")
var dbq = require('./dbconnection')

router.get('/', async (req,res)=>{

    var seelct = 'select count(*) from users';
    var result = await dbq.dbQuery(seelct)   
    console.log(result);
    const response = {"Status" : "Success", "Details":"wELCOME TO API SERVOCES"}
    return  res.send(response)
});

router.post('/sign_up', async(req,res)=>{

    try{
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;


    if(!firstname)
    {
        const resp = {"Status": "Failure","Details":"Please provide firstname"}
        return res.status(400).send(resp);
    }

    if(!lastname)
    {
        const resp = {"Status": "Failure","Details":"Please provide lastname"}
        return res.status(400).send(resp);
    }

    if(!email)
    {
        const resp = {"Status": "Failure","Details":"Please provide email"}
        return res.status(400).send(resp);
    }

    if(!password)
    {
        const resp = {"Status": "Failure","Details":"Please provide password"}
        return res.status(400).send(resp);
    }

    var signupquery = `insert into users (firstname,lastname,email,password
                        --,created_date
                        ) 
                        values
                        ('${firstname}','${lastname}','${email}','${password}')`;

    var result = await dbq.dbQuery(signupquery)   
    console.log(result)
    if(result.rowCount == 0)
    {
        const reres = {"Status":"Failure",
                        "Details":"Unable to sign up",
                        "No of rows effected":result.rowCount}
        return res.status(400).send(reres)
    }

    if(result.rowCount > 0)
    {
        const reres = {"Status":"Success",
                        "Details":"Successfully sign up",
                        "No of rows effected":result.rowCount}
        return res.status(200).send(reres)
    }
}
catch(err){
    const resp = {"Status": "Failure","Details":err.message}
        return res.status(400).send(resp);
}
})

router.post('/login', async(req,res)=>{

    try{
           var email = req.body.email;
           var password = req.body.password;

            if(!email)
            {
                const resp = {"Status": "Failure","Details":"Please provide email"}
                return res.status(400).send(resp);
            }

            if(!password)
            {
                const resp = {"Status": "Failure","Details":"Please provide password"}
                return res.status(400).send(resp);
            }

            let loginquery = `select * from users where email = '${email}' and password = '${password}'`;

            var result = await dbq.dbQuery(loginquery)

            if(result.rowCount == 0)
            {
                const resp = {"Status": "Failure","Details":"Invalid email or password"}
                return res.status(400).send(resp);
            }
            else{
                const resp = {"Status": "Success","Details":"Login successful","Id":result.rows[0].id}
                return res.status(200).send(resp);
            }

    }
    catch(err)
    {
        const resp = {"Status": "Failure","Details":err.message}
        return res.status(400).send(resp);
    }
})


module.exports = router;