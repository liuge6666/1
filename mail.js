const nodemailer = require("./nodemailer/lib/nodemailer");

/**
 * QQ的发送邮件函数
 *
 * @param {String} 1228773786@qq.com 自己的邮箱
 * @param {String} quwmhbxlwmmyicid qq邮箱授权码
 * @param {Object} 微哨打卡 发送的内容
 * @param {String} Kiss.1228773786@qq.com 发件人 昵称及邮箱，格式：昵称<邮箱>
 * @param {String} a15659232897@163.com 收件人邮箱 可多个（用英文逗号分隔）
 * @param {String} 微哨打卡.微哨打卡 主题、标题
 * @param {String} c打卡成功 正文 纯文本内容
 * @param {String} content.html 正文 html[可选]
 * @return {Promise} 邮件发送结果
 */
function sendMail (user, pass, content) {
  // 使用默认的SMTP传输创建可重用的传输对象
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 587,
    secure: false,
    auth: {
      user: user, // 用户账号
      pass: pass, // 授权码,通过QQ获取
    },
  });
  // 使用定义的传输对象发送邮件，并返回邮件发送结果<Promise>
  return transporter.sendMail(content);
}


module.exports = function (subject, text) {
  if (!process.env["MAIL"]) return;
  let {user, pass, to} = JSON.parse(process.env["MAIL"])
  if(user && pass && to && subject && text){
    sendMail(user, pass,
      {
        from: `Daka<${user}>`,
        to: to,
        subject: subject,
        text: text
      }).then(() => {
        console.log('邮件发送成功');
      }).catch(() => {
        console.log('邮件发送失败');
      })
  }
}
