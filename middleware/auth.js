import jwt from 'jsonwebtoken'

export const auth = (req, res, next)=>{

    let token = req.header('token')       

    jwt.verify(token, process.env.SECRET_KEY, async function(err, decoded) {
        if(err){
            res.json({message: "Error in token or token not provided.", err})
        }
        else{
            req.userId = decoded.userId
            next()
        }
})
}

//     try{
//     let authorization = req.headers['authorization']
//     console.log(authorization);
//     if(!authorization || (authorization && authorization.startsWith("Bearer") == false)){
//         res.json({message: "Error in token or token not provided.", err})
//     }
//     else{
//         let token = authorization.split(" ")[1]
//         jwt.verify(token, process.env.SECRET_KEY, async (err, decoded)=>{
//             if(err) return res.json({message: "Error in token or token not provided.", err})

//             req.userId = decoded.userId
//             next()
//         })
//     }
// }
// catch(err){
//     res.json({message: "No Token Provided.", err})
// }

