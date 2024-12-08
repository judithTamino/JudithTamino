let validId = true, supportStorage;

window.onload = () => {
  if (typeof (Storage) !== "undefined") {
    const board = localStorage.getItem("board");
    document.querySelector(".page-builder_board").innerHTML = board;

    supportStorage = true;
  } else {
    supportStorage = false;
  }
}

const addNewElement = () => {
  // choose element type
  const elementType = document.querySelector("#element-type").value;
  const newElement = document.createElement(elementType);

  // adding default style to the new element
  newElement.style.width = "100px";
  newElement.style.height = "100px";
  newElement.style.border = "1px solid black";

  // add background color to the new element
  newElement.style.backgroundColor = document.querySelector("#element-bg_color").value;

  // add width and height to the new element
  newElement.style.width = document.querySelector("#element-width").value + "px";
  newElement.style.height = document.querySelector("#element-height").value + "px";

  // add content to the new element
  newElement.innerText = document.querySelector("#element-txt").value;

  // add font color and size to the new element
  newElement.style.color = document.querySelector("#element-font_color").value;
  newElement.style.fontSize = document.querySelector("#element-font_size").value + "px";

  // add border to the new element 
  newElement.style.borderWidth = document.querySelector("#border-width").value + "px";
  newElement.style.borderStyle = document.querySelector("#border-style").value;
  newElement.style.borderColor = document.querySelector("#border-color").value;

  // add margin to the new element
  newElement.style.marginTop = document.querySelector("#mar-top").value + "px";
  newElement.style.marginRight = document.querySelector("#mar-right").value + "px";
  newElement.style.marginBottom = document.querySelector("#mar-bottom").value + "px";
  newElement.style.marginLeft = document.querySelector("#mar-left").value + "px";

  // add padding to the new element
  newElement.style.paddingTop = document.querySelector("#pad-top").value + "px";
  newElement.style.paddingRight = document.querySelector("#pad-right").value + "px";
  newElement.style.paddingBottom = document.querySelector("#pad-bottom").value + "px";
  newElement.style.paddingLeft = document.querySelector("#pad-left").value + "px";

  // add border radius to the element
  newElement.style.borderTopRightRadius = document.querySelector("#radius-tr").value + "px";
  newElement.style.borderTopLeftRadius = document.querySelector("#radius-tl").value + "px";
  newElement.style.borderBottomRightRadius = document.querySelector("#radius-br").value + "px";
  newElement.style.borderBottomLeftRadius = document.querySelector("#radius-bl").value + "px";

  // add shadow to the element
  const rgba = hexToRgba();
  const x = document.querySelector("#x-axis").value;
  const y = document.querySelector("#y-axis").value;
  newElement.style.boxShadow = `${x}px ${y}px ${rgba}`;

  // add title attribute to the element
  /* bonus => add when was the element created*/
  const date = new Date().toLocaleDateString('en-us',
    {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "2-digit"
    });
  const title = document.querySelector("#title-att").value;
  newElement.setAttribute("title", `${title} (${date})`);

  // add id attribute to the element
  const id = document.querySelector("#id-att");
  const errorMsg = document.querySelector(".msg");

  if (validId && findId(id.value)) {
    if (id.value != "")
      newElement.id = id.value;

    // add new element to the board
    document.querySelector(".page-builder_board").appendChild(newElement);

    document.querySelector(".save-btn").classList.add("glowing-btn");
  }

  setDefualtValues();
}

const deleteBoard = () => {
  document.querySelector(".page-builder_board").innerHTML = "";

  if (supportStorage)
    localStorage.removeItem("board");
}

const saveBoard = () => {
  const board = document.querySelector(".page-builder_board").innerHTML;

  // check if browser supports local storage
  if (supportStorage) {
    localStorage.setItem("board", board);
    document.querySelector(".save-btn").classList.remove("glowing-btn");
  } else {
    const msg = document.querySelector(".msg");
    msg.classList.add("error-msg");
    msg.innerText = "couldnt save board";
  }
}

const isIdValid = id => {
  /* check if element id is valid => doesnt start with numbers or character and not contain any whitespace*/
  const msg = document.querySelector(".msg");
  const userId = document.querySelector("#id-att");
  if (/^[A-Za-z][-A-Za-z0-9_:.]*$/.test(id) || id == "") {
    msg.classList.remove("error-msg");
    userId.classList.remove("error-border");
    validId = true;

  } else {
    msg.classList.add("error-msg");
    msg.innerText = "element id cant start with numbers or apecial characters \n and cant contain any whitespace."

    userId.classList.add("error-border");
    validId = false;
  }

  console.log(validId);
}

const findId = id => {
  /*check if id is already exists
  true => id doesnt exists 
  false => id exists*/
  const isExist = document.getElementById(`${id}`);
  const msg = document.querySelector(".msg");
  const userId = document.querySelector("#id-att");
  if (isExist != null) {
    msg.classList.add("error-msg");
    msg.innerText = "id already exists"
    userId.classList.add("error-border");
    return false;

  } else {
    msg.classList.remove("error-msg");
    userId.classList.remove("error-border");
    return true;
  }
}

const setDefualtValues = () => {
  // width & height
  document.querySelector("#element-width").value = "100";
  document.querySelector("#element-height").value = "100";

  // contect
  document.querySelector("#element-txt").value = "";

  // font size
  document.querySelector("#element-font_size").value = "16";

  // border
  document.querySelector("#border-width").value = "1";
  document.querySelector("#border-style").value = "none"
  document.querySelector("#border-color").value = "#3858d6";

  // margin
  document.querySelector("#mar-top").value = "10";
  document.querySelector("#mar-right").value = "10";
  document.querySelector("#mar-bottom").value = "10";
  document.querySelector("#mar-left").value = "10";

  // padding
  document.querySelector("#pad-top").value = "10";
  document.querySelector("#pad-right").value = "10";
  document.querySelector("#pad-bottom").value = "10";
  document.querySelector("#pad-left").value = "10";

  // border radius
  document.querySelector("#radius-tr").value = "5";
  document.querySelector("#radius-tl").value = "5";
  document.querySelector("#radius-br").value = "5";
  document.querySelector("#radius-bl").value = "5";

  // element type
  document.querySelector("#element-type").value = "div";

  // title attribute
  document.querySelector("#title-att").value = "";

  // id attribute
  document.querySelector("#id-att").value = "";
}

const displayRange = opacity => {
  const rangeText = document.querySelector(".range-value").innerText = opacity;
}

// convert hex color to rgba
const hexToRgba = () => {
  const opacity = document.querySelector("#opacity").value;
  const hex = document.querySelector("#shadow-color").value;

  const rgb = ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];

  return `rgba(${rgb},${opacity})`;
}