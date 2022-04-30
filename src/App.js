import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Table from "./Components/Table";
import useFetch from "./hooks/useFetch";
import axios from "axios";
import qs from "qs";

function App() {
  const [value, setValue] = useState([]); // общее количество
  const [sum, setSum] = useState([]); // сумма товаров
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const { data, error, loading } = useFetch(
    "https://datainlife.ru/junior_task/get_products.php"
  );
  useMemo(() => {
    setProducts(items.filter((item) => item.count > "0"));
    setSum(items?.reduce((acc, item) => acc + item.sum, 0));
    setValue(items?.reduce((acc, item) => acc + Number(item.count), 0));
  }, [items]);
  let product = products.map(({ count, goods: [{ gid }] }) => ({
    [`product[${gid}]`]: count,
  }));
  // let product = {
  //   id: products.map(({goods: [{ gid }]}) => gid),
  //   count: products.map(({count}) => count)
  // }
  let result = { product };
  console.log(product);
  // `product[${product.id}] = ${product.count}`
  // let postData = qs.parse(
  //   result
  // );

const formatData = (array) => {
  const product = {}
  return result
}

  let options = {
    method: "POST",

    headers: { "content-type": "application/x-www-form-urlencoded" },

    data: qs.stringify(result),

    url: "https://datainlife.ru/junior_task/add_basket.php",
  };

  useEffect(() => {
    if (data) {
      setItems(
        data.map((item) => ({
          ...item,
          count: 0,
          sum: 0,
        }))
      );
    }
  }, [data]);

  const handleCount = (id, count) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.goods[0].gid === id) {
          return { ...item, count, sum: item.goods[0].gprice * count };
        }
        return item;
      })
    );
  };

  if (error) {
    console.log(`error: ${error}`);
    return null;
  }
  if (loading) {
    return "loading...";
  }

  return (
    <>
      <h1>Название раздела</h1>

      <table align="center" border="2" cellSpacing="0" width="1200">
        <tbody>
        {data
          ? items.map((item) => (
              <Table
                sum={item.sum}
                handleCount={handleCount}
                count={item.count}
                price={item.goods[0].gprice}
                name={item.goods[0].gname}
                id={item.goods[0].gid}
                key={item.goods[0].rid}
              />
            ))
          : null}
          </tbody>
      </table>
      <p>Общая сумма:{sum}</p>
      <p>
        Общее количество:
        {value}
      </p>
      <button
        onClick={() =>
          axios(options)
            .then((response) => console.log(response))
            .catch((error) => console.log(error))
        }
      >
        В корзину
      </button>
    </>
  );
}

export default App;
