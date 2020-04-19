import React, { useState, useEffect } from 'react';
import './App.css';
import { UserContext } from './components/Context';
import Products from './components/Products';
import EditProduct from './components/EditProduct';
import AddProduct from './components/AddProduct';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {db} from './db'

import ProductsSearch from './components/ProductsSearch';

function App() {
  const [state, setState] = useState({
    items: [],
    editItemModal: false,
    itemToEdit: {},
    newItemModal: false,
    newItem: {
      name: '',
      price: '',
      amount: '',
      type: '',
      image: '',
    },
    types: ['Laptops', 'Desktops', 'Apple Products', 'Gaming', 'Drones'],
    dropdown: false,
  });

  useEffect(() => {
    // fetch('/products')
    //   .then((res) => res.json())
    //   .then((res) => setState({ ...state, items: res }));
    setState({...state, items: db[0]})
  }, []);

  const toggleEdit = (id) => {
    console.log(id);
    const item = state.items.find((item) => item._id === id);
    console.log(item);
    setState({
      ...state,
      editItemModal: true,
      itemToEdit: item,
    });
  };

  const confirmEdit = () => {
    const items = state.items.map((item) =>
      item._id === state.itemToEdit._id ? { ...state.itemToEdit } : { ...item }
    );

    // fetch(`/products/edit/${state.itemToEdit._id}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(state.itemToEdit),
    // });
    setState({ ...state, items, editItemModal: false });
  };

  const deleteItem = () => {
    if (
      window.confirm(
        `Are you sure you want to remove ${state.itemToEdit.name}?`
      )
    ) {
      // fetch(`/products/remove/${state.itemToEdit._id}`, {
      //   method: "DELETE"
      // })
      const newItems = state.items.filter(
        (item) => item._id !== state.itemToEdit._id
      );
      
      setState({ ...state, items: newItems, editItemModal: false });
    }
  };

  const newItem = () => {
    setState({ ...state, newItemModal: true });
    console.log(state);
  };

  const confirmAdd = () => {
    const { name, price, amount, type } = state.newItem;

    if ((name === '' && price === '') || amount === '' || type === '') {
      alert('Please Included the following: (Name, Price, Amount, and Type)');
    } else {
      // fetch('/products/add', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(state.newItem),
      // });
      setState({
        ...state,
        items: [...state.items, { ...state.newItem }],
        newItemModal: false,
        newItem: {},
      });
    }
  };

  return (
    <Router>
      <UserContext.Provider
        value={{
          state,
          setState,
          toggleEdit,
          confirmEdit,
          newItem,
          deleteItem,
          confirmAdd,
        }}
      >
        <Header />
        {state.items.length > 0 ? (
          <Switch>
            <Route exact path={`/fast-tech-site-BUILD/`}>
              <Products />
            </Route>
            <Route exact path={`/fast-tech-site-BUILD/:type`}>
              <Products />
            </Route>
            <Route exact path={`/fast-tech-site-BUILD/search/:term`}>
              <ProductsSearch />
            </Route>
          </Switch>
        ) : (
          <div className='py-5'>
            <h1 className='display-4 text-center'>
              There are no products.. Please add some
            </h1>
          </div>
        )}

        <EditProduct />
        <AddProduct />
      </UserContext.Provider>
    </Router>
  );
}

export default App;
