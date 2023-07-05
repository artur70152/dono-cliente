import User from '../models/user';
//yup é usado para fazer validações nome obrigatorio e etc...


import * as yup from 'yup'
class UserController{

async store(req, res){
// o yup segue o schema validation,estamos validando um objeto(req.body)
//depois declaramos o fomato que o objeto tem que ter: object().shape()


const schema=yup.object().shape({
name:yup.string().required(),
email:yup.string().email().required(),
password: yup.string().required().min(3),

})
if(!(await schema.isValid(req.body))){
    return res.status(400).json({error:'validation fails'})
 
}
const user = await User.findByPk(req.userId);

//if(email && email!=user.email){  
   // const userExists=await User.findOne({where:{email:req.body.email}})

  //  if(userExists){
     //   return res.status(400).json({error:'user already exists'})
  //  }
//}
const {id,name,email,provider}=await User.create(req.body)

return res.json({id,name,email,provider})
}



}


export default new UserController();