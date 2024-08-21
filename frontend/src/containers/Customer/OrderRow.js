import { useContext, useState } from "react";
import axios from "axios";
import { CurrencyContext } from "../../context/CurrencyContex"; // Fixed typo
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

function OrderRow(props) {
  const { index, products } = props; 
  const { getCurrency } = useContext(CurrencyContext);
  const { themeMode } = useContext(ThemeContext);

  const [totalDownloads, setTotalDownloads] = useState(products.product?.downloads || 0);

  const countDownloads = async (product_id) => {
    try {
      const formData = new FormData();
      formData.append("product_id", product_id);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/ecommerce/count_product_download/${product_id}/`,
        formData
      );

      if (response.data.bool === true) {
        setTotalDownloads(response.data.downloads);
        const imageUrl = products.product?.image;
        downloadImage(imageUrl, products.product?.title || "download");
      } else {
        console.error("API response indicates failure:", response.data);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const downloadImage = (imageUrl, fileName) => {
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
    }).catch((error) => {
      console.error("Error during image download:", error);
    });
  };

  const imageUrl = products.product?.image;
  const imageSrc = (imageUrl?.startsWith('http') ? imageUrl : `${process.env.REACT_APP_API_URL}/${imageUrl}`);

  return (
    <tr style={{ color: themeMode === "dark" ? "white" : "black" }}>
      {console.log("Orders",products)}
      <td>{index + 1}</td>
      <td>
        <span style={{ display: "flex", alignItems: "center" }}>
          <img
            src={imageSrc}
            className="img-thumbnail"
            style={{ width: "60px", marginRight: "10px" }}
            alt={products.product?.title}
          />
          <p>{products.product?.title}</p>
        </span>
      </td>
      <td>
        {getCurrency === 'inr' ? (
          <p>₹ {products.product?.price}</p>
        ) : (
          <p>$ {products.product?.usd_price}</p>
        )}
      </td>
      <td>{products.order?.order_time}</td>
      <td>
        {products.order?.order_status === 'completed' ? (
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
        {
          products.order?.order_status === 'completed' ? (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => countDownloads(products.product?.id)}
            >
              Download &nbsp;
              <span className="badge text-dark bg-white">{totalDownloads}</span>
            </button>
          ) : (
            <div>
              <Link className="btn btn-dark" to={`/make/payment/${products.order?.id}`}>Pay</Link>
            </div>
          )
        }
      </td>
    </tr>
  );
}

export default OrderRow;
