import "jest-dom/extend-expect";
import regeneratorRuntime from "regenerator-runtime";

export function getExampleDOM() {
  const div = document.createElement("div");
  div.id = "root";
  return div;
}