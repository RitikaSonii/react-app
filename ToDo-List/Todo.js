import React, { useState, useEffect } from 'react';
import '../App.css';
import todo from '../image/todo.svg';

// To get data from local Storage
const getLocalData = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState(getLocalData());
  const [toggleSubmit, setToggleSubmit] = useState(true); // Toggle the icon
  const [isEditItem, setIsEditItem] = useState(null);

  // get input data
  const inputDataHanler = (event) => {
    console.log(event);
    setInputData(event.target.value);

    // Add Item in todo list
  };
  const addItemHandler = () => {
    if (!inputData) {
      alert('Please fill the data');
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );

      setToggleSubmit(true);
      setInputData('');
      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData('');
    }
  };

  // Edit Item
  const editItemHandler = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    setToggleSubmit(false);
    setInputData(newEditItem.name);
    setIsEditItem(id);
  };

  // Delete Item from list

  const deleteItemHandler = (index) => {
    const updatedItems = items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updatedItems);
  };

  // Remove All todo list

  const removeAllHandler = () => {
    setItems([]);
  };

  // Add Data to local Storage

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
          <figure>
            <img src={todo} alt='todo-logo' />
            <figcaption>Add your To-Do </figcaption>
          </figure>
          <div className='addItems'>
            <input
              type='text'
              className='form-control'
              placeholder='✍️ Add Items..'
              value={inputData}
              onChange={inputDataHanler}
            />
            {toggleSubmit ? (
              <i
                className='fa fa-plus add-btn'
                title='Add Item'
                onClick={addItemHandler}
              ></i>
            ) : (
              <i
                className='far fa-edit add-btn'
                title='Update Item'
                onClick={addItemHandler}
              ></i>
            )}
          </div>
          <div className='showItems'>
            {items.map((element) => {
              return (
                <div className='eachItem' key={element.id}>
                  <h3>{element.name}</h3>
                  <div className='todo-btn'>
                    <i
                      className='far fa-edit add-btn'
                      title='Edit Item'
                      onClick={() => editItemHandler(element.id)}
                    ></i>
                    <i
                      className='far fa-trash-alt add-btn'
                      title='Delete Item'
                      onClick={() => deleteItemHandler(element.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CLear all  */}

          <div className='showItems'>
            <button>
              <span
                className='btn effect04'
                data-sm-link-text='Remove All'
                onClick={removeAllHandler}
              >
                Check List
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
