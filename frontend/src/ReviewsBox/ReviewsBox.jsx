import React, { useState, useEffect } from "react";
import styles from "./ReviewsBox.module.css";
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

function ReviewsBox() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Funkcja pobierająca recenzje z API
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5028/api/Reviews/movie/2', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`  // Dodaj nagłówek autoryzacyjny
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

  // useEffect, który wywołuje fetchData przy pierwszym renderze komponentu
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section style={{ backgroundColor: "white" }}>
      <MDBContainer className="py-5" style={{ maxWidth: "1000px", maxHeight: "600px", overflow: "auto" }}>
        <MDBRow className="justify-content-center">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            reviews.map((review) => (
              <MDBCol key={review.id} md="12" lg="10">
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
                        src="src/assets/avatar.png"
                        alt="avatar"
                        style={{ width: "50px", height: "50px" }}
                      />
                      <MDBTypography tag="h6" className="fw-bold mb-1">
                        {review.username} dał ocenę: {review.review_mark}
                      </MDBTypography>
                      <div className="d-flex align-items-center">
                        <p className="mb-0">
                          {review.review_date}
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
            ))
          )}
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default ReviewsBox;
