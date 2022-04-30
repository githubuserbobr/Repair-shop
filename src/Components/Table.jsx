import React from "react";
import "../App.css";
const Table = ({ id, name, price, handleCount, sum, count }) => {
  return (
    <tr>
      <td>id:{id}</td>
      <td>Название товара: {name}</td>
      <td>Цена: {price}</td>
      <td>
        Количество:{" "}
        <input
          value={count}
          type="number"
          onChange={(e) => {
            handleCount(
              id,
              e.currentTarget.value < 0 ? 0 : e.currentTarget.value
            );
          }}
        />
      </td>
      <td>Сумма: {sum}</td>
    </tr>
  );
};
export default Table;
