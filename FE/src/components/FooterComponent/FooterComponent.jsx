import React from "react";
import image1 from "../../assets/images/footer1.jpg";
import image2 from "../../assets/images/footer2.jpg";
import image3 from "../../assets/images/footer3.jpg";
import image4 from "../../assets/images/footer4.jpg";
import { UpOutlined } from "@ant-design/icons";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

const FooterComponent = () => {
  return (
    <footer className="footer-32892 pb-0" style={{}}>
      <div className="site-section">
        <div className="container" style={{ height: "60vh" }}>
          <div className="row d-flex gap-6">
            <div className="col-md pr-md-5 mb-4 mb-md-0">
              <h3>Về chúng tôi</h3>
              <ul className="list-unstyled quick-info mb-4">
                <li>
                  Đồng hồ ngày nay đã trở thành một phụ kiện, một vật dụng không
                  thể thiếu của cánh nam giới và cả nữ giới. Việc đeo đồng hồ
                  không chỉ giúp quản lý thời gian mà còn thể hiện phong cách,
                  cá tính cũng như đẳng cấp của người đeo đồng hồ. Vì thế hãy
                  đến với chúng tôi. Watch nâng tầm thương hiệu.
                </li>

                <li>
                  <a href="#" className="d-flex align-items-center">
                    <span className="icon mr-3 icon-envelope"></span> +84 456
                    789{" "}
                  </a>
                </li>
                <li>
                  <a href="#" className="d-flex align-items-center">
                    <span className="icon mr-3 icon-envelope"></span> Khu II, Đ.
                    3 Tháng 2, Xuân Khánh, Ninh Kiều, Cần Thơ{" "}
                  </a>
                </li>
              </ul>

              {/* <form action="#" className="subscribe">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your e-mail"
                />
                <input type="submit" className="btn btn-submit" value="Send" />
              </form> */}
            </div>

            <div className="col-md mb-4 mb-md-0">
              <h3>Map</h3>
              <ul className="list-unstyled tweets">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.8415184420583!2d105.76804037479394!3d10.029933690077012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBD4bqnbiBUaMah!5e0!3m2!1svi!2s!4v1712733761743!5m2!1svi!2s"
                  style={{ width: "80%", height: "13em", border: "0" }}
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                />
              </ul>
            </div>
            <div className="col-md-3 mb-4 mb-md-0">
              <h3>Instagram</h3>
              <div className="row gallery">
                <div className="col-6">
                  <a href="#">
                    <img src={image1} alt="Image" className="img-fluid" />
                  </a>
                  <a href="#">
                    <img src={image2} alt="Image" className="img-fluid" />
                  </a>
                </div>
                <div className="col-6">
                  <a href="#">
                    <img src={image3} alt="Image" className="img-fluid" />
                  </a>
                  <a href="#">
                    <img src={image4} alt="Image" className="img-fluid" />
                  </a>
                </div>
              </div>
            </div>

            {/* <div className="col-12">
              <div className="py-5 footer-menu-wrap d-md-flex align-items-center">
                <ul className="list-unstyled footer-menu mr-auto">
                  <li><a href="#">Trang chủ</a></li>
                  <li><a href="#">Tin tức</a></li>
                  <li><a href="#">Gợi ý sản phẩm</a></li>
                  <li><a href="#">Services</a></li>
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">Contacts</a></li>
                </ul>
                <div className="site-logo-wrap ml-auto">
                  <a href="#" className="site-logo">
                   Decoration Shop
                  </a>
                </div>
              </div>
            </div>
             */}
          </div>
        </div>
      </div>
      <ScrollToTop />
    </footer>
  );
};

export default FooterComponent;
