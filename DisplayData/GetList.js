import React, { useState, useEffect } from 'react';

const GetList = () => {
  const [users, setUsers] = useState([]);

  // const paging = [
  //   { p: 1, url: 'https://reqres.in/api/users?page=1' },
  //   { p: 2, url: 'https://reqres.in/api/users?page=2' },
  // ];

  const f = async () => {
    const res = await fetch('https://reqres.in/api/users?page=1');
    const json = await res.json();
    setUsers(json.data);
  };

  const getNextPageData = async () => {
    const res = await fetch('https://reqres.in/api/users?page=2');
    const json = await res.json();
    setUsers(json.data);
  };

  const getPrevPageData = () => {
    f();
  };
  useEffect(() => {
    f();
  }, []);

  return (
    <div>
      <h1>Hello users!</h1>
      <div>
        {users.length &&
          users.map((user) => {
            return (
              <div key={user.id}>
                <p>
                  <strong>{user.first_name}</strong>
                </p>
                <p>{user.email}</p>
                <img key={user.avatar} src={user.avatar} alt='' />
              </div>
            );
          })}
        <div>
          <button onClick={getPrevPageData}>Page 1</button>
          <button onClick={getNextPageData}>Page 2</button>
        </div>
      </div>
    </div>
  );
};

export default GetList;
