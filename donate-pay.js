// document.getElementById("submit_btn").addEventListener("click", function () {
//   alert("Button was clicked!");
// });
// const btn = document.getElementById("submit_btn");
// btn.addEventListener("click", function () {
//   alert("Button was clicked!");
// });

const mysql = require("mysql");
const con = mysql.createConnection();
document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("submit_btn").addEventListener("click", function () {
    alert("Button was clicked!");
  });
});
