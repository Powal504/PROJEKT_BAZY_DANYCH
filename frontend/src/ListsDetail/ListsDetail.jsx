import React from "react";
import styles from './ListDetail.module.css';

const ListsDetail = ({ userCatalogs, selectedCatalogId, toggleMovieList, handleAddMovieToCatalog }) => {
  if (!userCatalogs || userCatalogs.length === 0) {
    return <p>No catalogs to display.</p>;
  }

  return (
    <></>
  );
};

export default ListsDetail;