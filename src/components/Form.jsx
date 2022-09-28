import React from "react";

export default function Form({
  checkExpiry,
  cardDetail,
  checkError,
  onChangeHandler,
  submit,
}) {
  function checkAlphabets(e) {
    var regex = new RegExp("^[0-9\b\t]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
      return true;
    }
    e.preventDefault();
    return false;
  }

  return (
    <form onSubmit={submit} className="input-holder-form">
      <div className="input-container">
        <label htmlFor="card-holder">Card holder name</label>
        <input
          className={`${
            !cardDetail.holderName && checkError.isError
              ? "card-holder-input errorBorder"
              : "card-holder-input"
          }`}
          maxLength="36"
          type="text"
          name="holderName"
          placeholder="e.g. Jane Appleseed"
          onChange={(e) => {
            onChangeHandler(e);
          }}
        />
        {!cardDetail.holderName && checkError.isError && (
          <span className="errormessage">{checkError.errorMessage}</span>
        )}
      </div>
      <div className="input-container">
        <label htmlFor="card-name">Card number</label>
        <input
          type="text"
          maxLength="16"
          name="holderNumber"
          onKeyDown={(e) => {
            checkAlphabets(e);
          }}
          onChange={(e) => {
            onChangeHandler(e);
          }}
          className={`${
            !cardDetail.holderNumber && checkError.isError
              ? "card-name-input errorBorder"
              : "card-holder-input"
          }`}
          placeholder="e.g. 1234 5678 9123 0000"
        />

        {!cardDetail.holderNumber && checkError.isError && (
          <span className="errormessage">{checkError.errorMessage}</span>
        )}
        {cardDetail.holderNumber.length != 19 && checkError.isError && (
          <span className="errormessage">
            Card Number can't be less then 16 digits
          </span>
        )}
      </div>
      <div className="secure-holder">
        <div className="input-container">
          <label htmlFor="expire-month">Exp. Date (MM/YY)</label>
          <div className="input-collection-holder">
            <input
              type="text"
              maxLength="2"
              name="month"
              id="expire-month"
              className={`${
                !cardDetail.month && checkError.isError ? "errorBorder" : ""
              }`}
              onKeyDown={(e) => {
                checkAlphabets(e);
              }}
              onChange={(e) => {
                onChangeHandler(e);
              }}
              placeholder="MM"
            />
            <input
              type="text"
              maxLength="2"
              name="year"
              id="expire-year"
              className={`${
                !cardDetail.year && checkError.isError ? "errorBorder" : ""
              }`}
              onKeyDown={(e) => {
                checkAlphabets(e);
              }}
              onChange={(e) => {
                onChangeHandler(e);
              }}
              placeholder="YY"
            />
          </div>
          {!cardDetail.month && !cardDetail.year && checkError.isError && (
            <span className="errormessage">{checkError.errorMessage}</span>
          )}
          {checkExpiry.isMonth && checkExpiry.isYear ? (
            <span className="errormessage">Card can not be Expired</span>
          ) : (
            ""
          )}
        </div>
        <div className="input-container">
          <label htmlFor="in-cvc">CVC</label>
          <div className="input-collection-holder">
            <input
              type="text"
              className={`${
                !cardDetail.cvcNumber && checkError.isError ? "errorBorder" : ""
              }`}
              onKeyDown={(e) => {
                checkAlphabets(e);
              }}
              onChange={(e) => {
                onChangeHandler(e);
              }}
              maxLength="3"
              name="cvcNumber"
              id="cvc"
              placeholder="e.g. 123"
            />
          </div>
          {!cardDetail.cvcNumber && checkError.isError && (
            <span className="errormessage">{checkError.errorMessage}</span>
          )}
          {cardDetail.cvcNumber.length != 3 && checkError.isError && (
            <span className="errormessage">
              Cvc can't be less then 3 digits
            </span>
          )}
        </div>
      </div>
      <button type="submit">Confirm</button>
    </form>
  );
}
