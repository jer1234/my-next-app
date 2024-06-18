import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import withAuth from '../hoc/withAuth';
import { setUsers } from '../slices/userSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [emailVisibility, setEmailVisibility] = useState({});

  useEffect(() => {
    async function fetchUsers(page = 1, allUsers = []) {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      const newUsers = response.data.data.filter(
        (user) =>
          user.first_name.startsWith('G') || user.last_name.startsWith('W')
      );
      allUsers = [...allUsers, ...newUsers];
      if (response.data.total_pages > page) {
        return fetchUsers(page + 1, allUsers);
      } else {
        dispatch(setUsers(allUsers));
      }
    }
    fetchUsers();
  }, [dispatch]);

  const toggleEmailVisibility = (userId) => {
    setEmailVisibility((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  return (
    <div>
      <Header title="Users List" />
      <main className="container">
        <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center"> 
        <div className="col-md-3 ms-md-auto">Name</div>
        <div className="col-md-3 ms-md-auto">Email</div>
        <div className="col-md-3 ms-md-auto"></div>
        </li>
          {users.map((user) => (
            <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div className="col-md-3 ms-md-auto"> <img src={user.avatar} width='70' height='70'/> {user.first_name} {user.last_name}</div>
              <div className="col-md-3 ms-md-auto"> {emailVisibility[user.id] ? user.email : '******'}</div>
              <div className="col-md-3 ms-md-auto">  
                    <button
                    className="btn btn-sm btn-primary"
                    onClick={() => toggleEmailVisibility(user.id)}>
                    {emailVisibility[user.id] ? 'Hide Email' : 'Show Email'}
                    </button>
                </div>
            </li>
          ))}
        </ul>
      </main>
      <Footer content="Copyright - Fahmi - Zurich Web Portal Test" />
    </div>
  );
}

export default withAuth(Users);
