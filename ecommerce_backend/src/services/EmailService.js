const dotenv = require("dotenv");
dotenv.config;
const nodemailer = require("nodemailer");

const sendEmailCreateOrder = async (orderItems, email) => {
  console.log("orderItems, email", orderItems, email);
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.MAIL_ACCOUNT,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let listItem = "";
  const attachImage = [];
  orderItems.forEach((order) => {
    listItem += `<div>
    <div>
      Bạn đã đặt sản phẩm <b>${order.name}</b> với số lượng: <b>${order.amount}</b> và giá là: <b>${order.price} VND</b></div>
      <div>Bên dưới là hình ảnh của sản phẩm</div>
    </div>`;
    attachImage.push({ path: order.image });
  });

  // async..await is not allowed in global scope, must use a wrapper
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "hoangphongvl2021@gmail.com", // sender address
    to: "hoangphongvl2021@gmail.com", // list of receivers
    subject: "Bạn đã mua sản phẩm tại Decoration shop", // Subject line
    text: "Hello world?", // plain text body
    html: `<div><b>Bạn đã đặt hàng thành công tại shop </b></div> ${listItem}`,
    attachments: attachImage,
  });
};

module.exports = {
  sendEmailCreateOrder,
};
