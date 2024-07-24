import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SAVE_BOOK } from "../utils/mutations";

const SearchBooks = () => {
  const [saveBook, { error }] = useMutation(SAVE_BOOK);

  const handleSaveBook = async (bookData) => {
    try {
      const { data } = await saveBook({
        variables: { bookData },
      });

      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return <div>{/* Your component code */}</div>;
};

export default SearchBooks;