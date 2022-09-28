const nodemailer = require('nodemailer');
const ejs = require('ejs');

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const html = await ejs.renderFile(
    `${__dirname}/../views/components/resetPasswordEmail.ejs`
  );

  const revisedHTML = html.replace('{resetLink}', options.link);

  // 2) Define the email options
  const mailOptions = {
    from: 'Ronald Chan <Ronaldchan96@gmail.com>',
    to: options.email,
    subject: options.subject,
    html: revisedHTML,
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
