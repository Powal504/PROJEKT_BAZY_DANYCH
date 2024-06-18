import React, { useEffect, useState } from 'react';
import styles from './Users_Info.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

// Function to fetch all users
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

function Users_Info() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      

      <div className="container mt-5">
        <h2 className={styles.UsersInfo}>User Information</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Birth Date</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.birth_date}</td>
                <td>{user.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.buttonadmin}>
        <Link to="/Admin" className={`btn btn-outline-danger ${styles.ToMovie}`}>
          Wróć
        </Link>
      </div>
    </>
  );
}

export default Users_Info;