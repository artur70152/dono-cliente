import {Router}from 'express'
//import User from './app/models/users';
import Sessioncontroller from './app/controlers/sessioncontroller';
import authMiddleware from './app/midlewares/auth';
import productscontroller from './app/controlers/productscontroller';
import Usercontroller from './app/controlers/usercontroller';
//import Signscontroler from './app/controlers/signscontroler';


const routes=new Router();

routes.post('/users',Usercontroller.store)
routes.post('/sessions',Sessioncontroller.store)
routes.use(authMiddleware)
routes.post('/sessions',Sessioncontroller.store)
routes.get('/dashboard',productscontroller.index)
routes.put('/dashboard',productscontroller.updateOwner)
routes.put('/dashboard2',productscontroller.updatecostumer)
routes.post('/dashboard',productscontroller.updateOwnercreate)


export default routes