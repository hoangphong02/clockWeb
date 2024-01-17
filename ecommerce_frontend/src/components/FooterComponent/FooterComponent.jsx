import React from 'react'
import image1 from '../../assets/images/img_1.jpg'
import image2 from '../../assets/images/img_2.jpg'
import image3 from '../../assets/images/img_3.jpg'
import image4 from '../../assets/images/img_4.jpg'
import { UpOutlined } from '@ant-design/icons'
import ScrollToTop from '../ScrollToTop/ScrollToTop'

const FooterComponent = () => {
  return (
 
<footer className="footer-32892 pb-0" style={{}}>
      <div className="site-section">
        <div className="container" style={{height:"70vh"}}>

          
          <div className="row">

            <div className="col-md pr-md-5 mb-4 mb-md-0">
              <h3>About Us</h3>
              <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam itaque unde facere repellendus, odio et iste voluptatum aspernatur ratione mollitia tempora eligendi maxime est, blanditiis accusamus. Incidunt, aut, quis!</p>
              <ul className="list-unstyled quick-info mb-4">
                <li><a href="#" className="d-flex align-items-center"><span className="icon mr-3 icon-phone"></span> +84 763 839 456</a></li>
                <li><a href="#" className="d-flex align-items-center"><span className="icon mr-3 icon-envelope"></span> hoangphongvl2002@gmail.com</a></li>
              </ul>

              <form action="#" className="subscribe">
  <input type="text" className="form-control" placeholder="Enter your e-mail" />
  <input type="submit" className="btn btn-submit" value="Send" />
</form>

            </div>
            <div className="col-md mb-4 mb-md-0">
              <h3>Latest Tweet</h3>
              <ul className="list-unstyled tweets">
                <li className="d-flex">
                  <div className="mr-4"><span className="icon icon-twitter"></span></div>
                  <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere unde omnis veniam porro excepturi.</div>
                </li>
                <li className="d-flex">
                  <div className="mr-4"><span className="icon icon-twitter"></span></div>
                  <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere unde omnis veniam porro excepturi.</div>
                </li>
                <li className="d-flex">
                  <div className="mr-4"><span className="icon icon-twitter"></span></div>
                  <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere unde omnis veniam porro excepturi.</div>
                </li>
              </ul>
            </div>


            <div className="col-md-3 mb-4 mb-md-0">
              <h3>Instagram</h3>
              <div className="row gallery">
                <div className="col-6">
                  <a href="#"><img src={image1} alt="Image" className="img-fluid"/></a>
                  <a href="#"><img src={image2} alt="Image" className="img-fluid"/></a>
                </div>
                <div className="col-6">
                  <a href="#"><img src={image3} alt="Image" className="img-fluid"/></a>
                  <a href="#"><img src={image4} alt="Image" className="img-fluid"/></a>
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
      <ScrollToTop/>
    </footer>

  )
}

export default FooterComponent