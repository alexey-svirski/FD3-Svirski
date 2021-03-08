import ReactDOM from "react-dom";
import Ishop3 from "./Ishop3";

var ishopName = "Интернет-магазин №1";
var itemsArr = require("./data.json");

ReactDOM.render(
  <Ishop3 shopName={ishopName} items={itemsArr}></Ishop3>,
  document.getElementById("container")
);