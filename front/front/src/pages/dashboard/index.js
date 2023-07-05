import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signout } from '../../funcionalidades/actions';
import history from '../../services/history';
import { useSelector } from 'react-redux';
import api from '../../services/api';
import { Navigate } from 'react-router-dom';

function Dashboard() {
  const dispatch = useDispatch();
  const prov = useSelector(state => state.auth.user?.provider);
  console.log(prov);

  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState({});
  const [addMode, setaddmode] = useState(false);

  const [newname, setnewname] = useState('');
  const [newquantity, setnewquantity] = useState('');
  const [newprice, setnewprice] = useState('');
  const [data2, setdata2] = useState([{}]);
const [lucr, setlucr]=useState();
const [listac, setlistac]=useState()
const [azz, setazz]=useState(false)

  const token = localStorage.getItem('token');
  api.defaults.headers.Authorization = `Bearer ${token}`;

  useEffect(() => {
    let soma=0;
    async function fetchData() {
    let listad=[]
    try {
    const response = await api.get('dashboard');
    const data = response.data;
    setData(data);
    for (let i = 0; i < data.length; i++) {
    soma += Number(data[i].lucros);
    if (data[i].quantity===0) {
    listad.push(data[i].name)
    setazz(true)
           }
    if (listad.length<1) {
    setazz(false)
    }
    }
    setlistac(listad+' ')
    setlucr(soma)
    }catch (error) {
    console.error('Failed to fetch data:', error);
    }
    }
    fetchData();
    }, [ ,data2,editMode]);

    if (prov === false) {
    return <Navigate to="/dashboard2" />;
    }

    const finalizar = () => {
    dispatch(signout());
    history.push('/');
    };

    const editar = (itemId) => {
    setEditMode({
   
      [itemId]: true
    });
    };
  
    const adcionar = () => {
    setaddmode(true);
    };

    const salvarEdicao = async (itemId) => {
    console.log(itemId)
    try {
      // Faça a requisição ao backend para atualizar o item
      await api.put('dashboard', {
        id:itemId,
        quantity: data.find(item => item.id === itemId).quantity,
        price: data.find(item => item.id === itemId).price
      });
      // Atualize o modo de edição para false
      setEditMode({
        
        [itemId]: false
      });
    } catch (error) {
      console.error('Failed to update item:', error);
    }

  };

  const cancelarEdicao = (itemId) => {
    setEditMode({
  
      [itemId]: false
    });
  };

  const handleQuantityChange = (itemId, event) => {
    const { value } = event.target;
    //quando colocamos prevstate, ele representa o estado anterior ao data.
    setData( data.map(item => {
      if (item.id === itemId) {
      
   
        return {
          ...item,
          quantity: value
        };
      }
      return item;
    }));
  };

   const namenew=(e)=>{
   setnewname(e.target.value)
   console.log(newname)
   }

  const quantitynew=(e)=>{
    setnewquantity(e.target.value)
    console.log(newquantity)
    }

  const pricenew=(e)=>{
  setnewprice(e.target.value)
  console.log(newprice)
  }

  const salvarnew=async ()=>{
  const response = await api.post('dashboard',
    {
     name:newname,
      quantity: newquantity,
       price: newprice
    })

    setaddmode(false)
    setdata2(response)
    console.log(response)
    setnewprice('')
    setnewquantity('')
    setnewname('')
    }

    const cancelarnew=(e)=>{
    setaddmode(false)
    console.log(newprice)
    }



  const handlePriceChange = (itemId, event) => {
    const { value } = event.target;
    setData(data.map(item => {

      if (item.id === itemId) {
        console.log('aaa')
        return {
          ...item,
          price: value
        };
      }
      return item;
    }));
  };




    return (
      <div>
        <h1>Dashboard Owner</h1>
        <h1>lucros: {lucr}</h1>
{(azz===true)?(<h1>precisamos comprar: {listac }</h1>):('')}
        <button type="submit" onClick={finalizar}>
          Sair
        </button>
    
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Lucro</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                {editMode[item.id] ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={item.quantity}
                        onChange={(event) => handleQuantityChange(item.id, event)}
                      />
                    </td>
    
                    <td>
                      <input
                        type="text"
                        value={item.price}
                        onChange={(event) => handlePriceChange(item.id, event)}
                      />
                    </td>
    
                    <td>
                      {item.lucros}
                    </td>
                    <td>
                      <button type="button" onClick={() => salvarEdicao(item.id)}>Salvar</button>
                      <button type="button" onClick={() => cancelarEdicao(item.id)}>Cancelar</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>
                      {item.lucros}
                    </td>
                    <td>
                      <button type="button" onClick={() => editar(item.id)}>Editar</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
    
        {addMode ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    value={newname}
                    onChange={namenew}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={newquantity}
                    onChange={(event) => quantitynew(event)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={newprice}
                    onChange={(event) => pricenew(event)}
                  />
                </td>
                <td>
                  <button type="button" onClick={salvarnew}>Salvar</button>
                  <button type="button" onClick={() => cancelarnew()}>Cancelar</button>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <button type="submit" onClick={adcionar}>
            adcionar
          </button>
        )}
      </div>
    );
}

export default Dashboard;