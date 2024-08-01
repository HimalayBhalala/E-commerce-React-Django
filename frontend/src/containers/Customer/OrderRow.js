import { useContext, useState } from "react";
import axios from "axios";
import { CurrencyContext } from "../../context/CurrencyContex";

function OrderRow(props) {
  const index = props.index;
  const {currency} = useContext(CurrencyContext);
  const products = props.products;

  const [totalDownloads, setTotalDownloads] = useState(
    products.product?.downloads || 0
  );

  async function countDownloads(product_id) {
    const formData = new FormData();
    formData.append("product_id", product_id);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/ecommerce/count_product_download/${product_id}/`,
        formData
      );
      if (response.data.bool === true) {
        setTotalDownloads(response.data.downloads);
        const imageUrl = `${process.env.REACT_APP_API_URL}/${products.product?.image}`;
        downloadImage(imageUrl, products.product?.image || "download");
      } else {
        console.log("API response indicates failure:", response.data);
      }
    } catch (error) {
      console.log("Error during fetching an API", error);
    }
  }

  function downloadImage(imageUrl, fileName) {
    axios({
      url: imageUrl,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  const imageUrl = `${process.env.REACT_APP_API_URL}/${products.product?.image}`;

  return (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>
        <span style={{ display: "flex", alignItems: "center" }}>
          <img
            src={imageUrl}
            className="img-thumbnail"
            style={{ width: "60px", marginRight: "10px" }}
            alt={products.product?.title}
          />
          <p>{products.product?.title}</p>
        </span>
      </td>
      <td>
        {
          currency === 'inr' ? (
            <p>₹ {products.product?.price}</p>
          ) : (
            <p>$ {products.product?.usd_price}</p>
          )
        }
      </td>
      <td>
        {products.order.order_status ? (
          <span className="text-success">
            <i className="fa fa-check-circle"></i> Completed
          </span>
        ) : (
          <span className="text-warning">
            <i className="fa fa-spinner order-status-spinner"></i> Processing
          </span>
        )}
      </td>
      <td>
        {products.order.order_status === true && (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => countDownloads(products.product.id)}
          >
            Download &nbsp;
            <span className="badge text-dark bg-white">{totalDownloads}</span>
          </button>
        )}
      </td>
    </tr>
  );
}

export default OrderRow;