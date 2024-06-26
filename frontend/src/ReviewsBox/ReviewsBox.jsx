import React, { useState, useEffect, useContext } from "react";
import styles from "./ReviewsBox.module.css";
import Button from 'react-bootstrap/Button';
import { GlobalContext } from "../GlobalContext/GlobalContext";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

function ReviewsBox({ movie_id }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const { currentReviewIdGlobal, setCurrentReviewIdGlobal } = useContext(GlobalContext);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://157.230.113.110:5028/api/Reviews/movie/${movie_id}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setReviews(data.reverse());
        setLoading(false);
        console.log("Pobrane recenzje: ", data);

      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://157.230.113.110:5028/api/userinfo/All', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setUsers(data);
        setLoadingUsers(false);
        console.log('Pobrani użytkownicy: ', data);

      } catch (error) {
        setError(error.message);
        setLoadingUsers(false);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://157.230.113.110:5028/api/userinfo', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setUser(data);
        setLoadingUsers(false);
        console.log('Aktywny użytkownik: ', data);

      } catch (error) {
        setError(error.message);
        setLoadingUsers(false);
      }
    };

    fetchReviews();
    fetchUsers();
    fetchCurrentUser();
  }, [movie_id]);

  const getUsernameById = (userId) => {
    const foundUser = users.find(u => u.id === userId);
    return foundUser ? foundUser.userName : "Nieznany użytkownik";
  };

  const handleDeleteReview = async () => {
    try {
      console.log("Usuwanie recenzji o ID:", currentReviewIdGlobal);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://157.230.113.110:5028/api/Reviews/${currentReviewIdGlobal}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
      }

      const updatedReviews = reviews.filter(review => review.review_id !== currentReviewIdGlobal);
      setReviews(updatedReviews);
      console.log('Recenzja została usunięta');
    } catch (error) {
      console.error('Błąd podczas usuwania recenzji:', error);
    }
  };

  if (loading || loadingUsers) {
    return <p>Ładowanie...</p>;
  }

  if (error) {
    return <p>Wystąpił błąd: {error}</p>;
  }

  if (reviews.length === 0) {
    return null; 
  }

  return (
    <section style={{ backgroundColor: "white", marginTop: "300px" }}>
      <MDBContainer className="py-5" style={{ maxWidth: "1000px", maxHeight: "600px", overflow: "auto" }}>
        <MDBRow className="justify-content-center">
          {reviews.map((review) => (
            <MDBCol key={review.review_id} md="12" lg="10">
              <MDBCard className="text-dark mb-4">
                <MDBCardBody className="p-4">
                  <MDBTypography tag="h4" className="mb-0">
                    {review.title}
                  </MDBTypography>
                  <p className="fw-light mb-4 pb-2">
                    {review.description}
                  </p>
                  <div className="d-flex flex-start align-items-center mb-3">
                    <MDBCardImage
                      className="rounded-circle shadow-1-strong me-3"
                      src="src/assets/avatar.jpg"
                      alt="avatar"
                      style={{ width: "50px", height: "50px" }}
                    />
                    <MDBTypography tag="h6" className="fw-bold mb-1">
                      {getUsernameById(review.userId)} dał filmowi ocenę: {review.review_mark}
                    </MDBTypography>
                    <div className="d-flex align-items-center" style={{ marginLeft: "10px", textAlign: "justify" }}>
                      <p className="mb-0">
                        {review.review_date}{' '}
                        {user && review.userId === user.id && (
                          <Button
                            variant="danger"
                            style={{ marginLeft: "10px" }}
                            onClick={() => {
                              setCurrentReviewIdGlobal(review.review_id); 
                              handleDeleteReview();
                            }}
                          >
                            Usuń
                          </Button>
                        )}
                        {' '}
                        <span className={`badge bg-${review.status === 'Approved' ? 'success' : review.status === 'Pending' ? 'primary' : 'danger'}`}>
                          {review.status}
                        </span>
                      </p>
                      <a href="#!" className="link-muted">
                        <MDBIcon fas icon="pencil-alt ms-2" />
                      </a>
                      <a href="#!" className="link-muted">
                        <MDBIcon fas icon="redo-alt ms-2" />
                      </a>
                      <a href="#!" className="link-muted">
                        <MDBIcon fas icon="heart ms-2" />
                      </a>
                    </div>
                  </div>
                  <p className="mb-0">{review.review_text}</p>
                </MDBCardBody>
                <hr className="my-0" />
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default ReviewsBox;
