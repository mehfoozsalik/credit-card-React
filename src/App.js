import CreditCard from "./components/CreditCard";
import Form from "./components/Form";
import reactLogo from "./assets/logo.svg";
import React, { useState } from "react";
import Complete from "./components/Complete";

function App() {
  const [cardDetail, setCardDetail] = useState({
    holderName: "",
    holderNumber: 0,
    month: 0,
    year: 0,
    cvcNumber: 0,
  });

  const [checkError, setCheckError] = useState({
    isError: false,
    errorMessage: "",
  });
  const [checkExpiry, setCheckExpiry] = useState({
    isMonth: false,
    isYear: false,
  });
  const [complete, setComplete] = useState();

  function format(s) {
    return s.toString().replace(/\d{4}(?=.)/g, "$& ");
  }
  const onChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "holderNumber") {
      setCardDetail({ ...cardDetail, [name]: format(value) });
    } else {
      setCardDetail({ ...cardDetail, [name]: value });
    }
  };

  const submit = (e) => {
    e.preventDefault();
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    year = year.toString().slice(-2);

    if (cardDetail.month <= month) {
      setCheckExpiry({
        isMonth: true,
        isYear: false,
      });
    } else {
      setCheckExpiry({
        isMonth: false,
        isYear: false,
      });
    }
    if (cardDetail.year < year) {
      setCheckExpiry({
        isMonth: true,
        isYear: true,
      });
    } else {
      setCheckExpiry({
        isMonth: false,
        isYear: false,
      });
    }

    if (
      checkExpiry.isMonth &&
      checkExpiry.isYear &&
      cardDetail.holderName &&
      cardDetail.holderNumber &&
      cardDetail.month &&
      cardDetail.year &&
      cardDetail.cvcNumber &&
      cardDetail.holderNumber.length == 19 &&
      cardDetail.cvcNumber.length == 3
    ) {
      setComplete(true);
      setCheckError({
        isError: false,
        errorMessage: "",
      });
    } else {
      setComplete(false);
      setCheckError({
        isError: true,
        errorMessage: "Can't be blank",
      });
    }
    console.log(cardDetail);
  };

  const onComplete = () => {
    setCardDetail({
      holderName: "",
      holderNumber: 0,
      month: 0,
      year: 0,
      cvcNumber: 0,
    });
    setComplete();
  };
  return (
    <div className="main-container">
      <img className="reactLogo" src={reactLogo} alt="" />
      <CreditCard
        Name={cardDetail.holderName}
        Number={cardDetail.holderNumber}
        Month={cardDetail.month}
        Year={cardDetail.year}
        CVC={cardDetail.cvcNumber}
      />
      {!complete ? (
        <Form
          checkExpiry={checkExpiry}
          cardDetail={cardDetail}
          checkError={checkError}
          onChangeHandler={onChangeHandler}
          submit={submit}
        />
      ) : (
        <Complete onComplete={onComplete} />
      )}
    </div>
  );
}

export default App;
