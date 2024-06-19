import React, { useEffect, useState, useContext } from 'react';
import styles from './Users_Info.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useHistory } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext/GlobalContext';

const fetchAllUsers = async () => {
  const token = localStorage.getItem('token')?.replace(/["']/g, '');
  try {
    const response = await fetch('http://157.230.113.110:5028/api/userinfo/All', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': '*/*'
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};

const deleteUser = async (username) => {
  const token = localStorage.getItem('token')?.replace(/["']/g, '');
  try {
    const response = await fetch('http://157.230.113.110:5028/api/admin/DeleteUser', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return true; // Deleted successfully
  } catch (error) {
    console.error('There was a problem with the delete operation:', error);
    throw error;
  }
};

function Users_Info() {
  const { userRole } = useContext(GlobalContext);
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userRole !== 'Admin') {
      history.push('/'); // Redirect to home if not an admin
      return;
    }

    const getUsers = async () => {
      try {
        const data = await fetchAllUsers();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    getUsers();
  }, [userRole, history]);

  const handleDelete = async (username) => {
    const confirmed = window.confirm(`Are you sure you want to delete user ${username}?`);
    if (confirmed) {
      try {
        await deleteUser(username);
        // After deletion, update the users list
        const updatedUsers = users.filter(user => user.userName !== username);
        setUsers(updatedUsers);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="container mt-5">
        <h2>User Information</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Birth Date</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.birth_date}</td>
                <td>{user.phoneNumber}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(user.userName)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.buttonadmin}>
          <Link to="/Admin" className={`btn btn-outline-danger ${styles.ToMovie}`}>
            Wróć
          </Link>
        </div>
      </div>
    </>
  );
}

export default Users_Info;