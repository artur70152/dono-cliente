//import logo from './logo.svg';

import React, { useEffect, useState } from 'react';
import history from '../../services/history';
import { useSelector } from 'react-redux';
import api from '../../services/api';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signout } from '../../funcionalidades/actions';
import { date } from 'yup';
import { useLocation } from 'react-router-dom';

function Dashboard() {
const token = localStorage.getItem('token');
api.defaults.headers.Authorization = `Bearer ${token}`;
const  lista1=[];
const [obj, setObj] = useState([]);
const[lista,setlista]=useState([])
const[somaa,setsoma]=useState()
const [counter, setCounter] = useState(0);
const location = useLocation();
const dataq = location.state;
console.log(dataq)
console.log(dataq.dataq[0])
const remover=(itemid)=>{
for (let i = 0; i < dataq.dataq.length; i++) {
console.log( dataq.dataq[i].amount)
if (dataq.dataq[i].id === itemid) {
dataq.dataq[i].amount-=1
console.log(dataq.dataq[i].amount)
    setObj(1)
}
}
setCounter((prevCounter) => prevCounter + 1);
}
const adcionar=(itemid)=>{
for (let i = 0; i < dataq.dataq.length; i++) {
console.log( dataq.dataq[i].amount)
if (dataq.dataq[i].id === itemid) {
dataq.dataq[i].amount+=1
console.log(dataq.dataq[i].amount)
setObj(1)
}
}
setCounter((prevCounter) => prevCounter + 1);
    }
useEffect(() => {
let soma=0
async function fetchData() {
console.log(dataq)
for (let i = 0; i < dataq.dataq.length; i++) {
console.log( dataq.dataq[i].amount)
if (dataq.dataq[i].amount !== 0) {
soma = soma + (dataq.dataq[i].amount * dataq.dataq[i].price)
lista1.push(dataq.dataq[i])
    setsoma(soma)
      }
    }

  console.log(lista1);
  setlista(lista1)
    
  console.log(obj);
  console.log(soma);
      }
  fetchData();
  console.log(lista)
}, [obj, counter]);

console.log(lista);
console.log(somaa);


const finalizar=async ()=>{


for (let p = 0; p < dataq.dataq.length; p++) {

  
for (let i = 0; i < lista.length; i++) {

  if (dataq.dataq[p].id===lista[i].id) {
   const totalamount= dataq.dataq[p].quantity-lista[i].amount
   console.log(dataq.dataq[p].lucros)
   console.log(lista[i].lucros)
   const totalrevenue= Number(dataq.dataq[p].lucros)+(Number(lista[i].amount*lista[i].price))

  console.log(totalrevenue)
  console.log(totalamount)
  
  await api.put('dashboard2', {
    id:lista[i].id,
    price: lista[i].price,
    quantity: lista[i].amount,
    
  });
  
}
}
await history.push('/dashboard2');
await history.go('/dashboard2');
}
}




  return (
    <div>
      <h1>voce comprou,</h1>


      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>quantity purchased</th>
            <th>Price</th>
            <th>Price total</th>

          </tr>
        </thead>
        <tbody>
          {lista.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
                  <td style={{ textAlign: 'center'} }>{item.amount}</td>
                  <td>{item.price}</td>
                  <td>{(item.price)*(item.amount)}</td>
                  <td> <button type="submit" onClick={()=>remover(item.id)}>remover</button></td>
                  <td> <button type="submit" onClick={()=>adcionar(item.id)}>adcionar</button></td>
          </tr>
        
          ))}
        </tbody>
      </table>
     <h1>total price:  {  somaa} reais</h1>
     <button type="submit" onClick={finalizar}>finalizar compras</button>

    </div>
  );
}

export default Dashboard;