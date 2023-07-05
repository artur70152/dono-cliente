//import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import history from '../../services/history';
import { useSelector } from 'react-redux';
import api from '../../services/api';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signout } from '../../funcionalidades/actions';
import { date } from 'yup';


function Dashboard2() {
const token = localStorage.getItem('token');
api.defaults.headers.Authorization = `Bearer ${token}`;
const dispatch = useDispatch();
const[dataq,setdata]=useState([])
const [comprara, setcomprar]=useState([])
const finalizar=()=>{
history.push('/finish',{dataq});
history.go('/finish',{dataq});
}
useEffect(() => {
async function fetchData() {
try {
const response = await api.get('dashboard');
const data = response.data;
console.log(data)
for (let i = 0; i < data.length; i++) { 
data[i].amount=0;
console.log(data[i].name)
console.log(data[i].amount)   
     }
console.log(data)
setdata(data)
console.log(dataq)
} catch (error) {
console.error('Failed to fetch data:', error);
}}
    fetchData();
  }, []);
const sair=()=>{
    dispatch(signout())
    history.push('/');
    history.go('/');
}
const comprar= (itemid)=>{ 
console.log(dataq)
for (let i = 0; i < dataq.length; i++) {
 if  (dataq[i].id===itemid) {
dataq[i].amount+=1;
console.log(dataq[i].name)
console.log(dataq[i].amount)
    }
    
}
}
  return (
    <div>
 <h1>dashboard costumer</h1>
 <div>

  <input type="text" id="INPUT PARA TESTAR HTML INJECTION"/>
</div>
 <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
        {dataq.map(item => (
  item.quantity > 0 && (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td style={{ textAlign: 'center' }}>{item.quantity}</td>
      <td>{item.price}</td>
      <td>
        <button type="submit" onClick={() => comprar(item.id)}>comprar</button>
      </td>
    </tr>
  )
))}
        </tbody>
      </table>
      <button type="submit" onClick={finalizar}>finalizar compras</button>
 <button type="submit" onClick={sair}>sair</button>

</div>
  );
}

export default Dashboard2;
