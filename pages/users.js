import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withAuth from '../hoc/withAuth';
import { getUsers,maskEmail,unmaskEmail} from '../slices/userSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [emailVisibility, setEmailVisibility] = useState({});

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const toggleEmailVisibility = (userId) => {
    emailVisibility[userId] ? dispatch(maskEmail(userId)) : dispatch(unmaskEmail(userId));
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
              <div className="col-md-3 ms-md-auto"> {user.email}</div>
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
