"use strict";

const formOne = document.querySelector("#form-one");
const firstName = formOne.querySelector("#first-name");
const lastName = formOne.querySelector("#last-name");
const email = formOne.querySelector("#email");

function validationSchema(inputValue, validationKey, validationValue) {
  /*if(validationKey === "isRequired"){
    //check if field is empty
  } else if(validationKey === "minLength"){
    //check if field has minLength
  } else if(validationKey === "maxLength"){
    //check if field has maxLength
  } */

  switch (validationKey) {
    case "isRequired":
      return inputValue.trim() !== "";
    case "minLength":
      return inputValue.trim().length >= validationValue;
    case "maxLength":
      return inputValue.trim().length <= validationValue;
    case "isEmail":
      {const regex=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-z]+)$/;
      return regex.test(inputValue);
    }
    case "isString":
      return /^([^0-9]*)$/.test(inputValue);
    default:
      throw new Error("Diesen Fall gibt es nicht du dulli");
  }
}

function validate(target, validationObject) {
  let isValid = true;
  //console.log("========================== Vor der Schleife ===================================================")
  //console.log(isValid)
  for (const key in validationObject) {
    isValid = validationSchema(target.value, key, validationObject[key]);
    //console.log("========================================= während der Schleife =========================================")
    //console.log(isValid)
    if(!isValid){
      break;
    }
  }

 //console.log("========================================= Fertiger Bool =========================================")
 //console.log(isValid)

  if(isValid){
    target.classList.add("success")
    target.style = "border-color: blue"
    const validMessage =  document.createElement("p");
    validMessage.innerText = "Alles supi"
    Element.append(validMessage)
  } else {
    target.style = "border-color: red"
  }
}

firstName.addEventListener("focusout", (e) => {
  validate(e.target, {
    isRequired: true,
    minLength: 2,
    maxLength: 20,
    isString: true,
  });
});

lastName.addEventListener("focusout", (e) => {
  validate(e.target, {
    isRequired: true,
    minLength: 5,
    maxLength: 20,
    isString: true,
  });
});

email.addEventListener("focusout", (e) => {
  validate(e.target, {
    isEmail: true,
  });
});
