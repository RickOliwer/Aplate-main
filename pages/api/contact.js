
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const Mail = async (req, res) => {
  const {subject, heading, url, namn, telefon, email, antal, meddelande} = req.body;

  try {
    const emailRes = await sgMail.send({
      from: process.env.MY_MAIL,
      to: process.env.MY_MAIL,
      subject: `Meddelande från ${namn}/${email}`,
      html: `
      <div>
        <div>
          <h2 style="color:#0f4127;">${heading}</h2>
          <h3><strong style="color:#8E443D;">Ämne:</strong><br> ${subject}</h3>
          <p><strong style="color:#8E443D;">Sida:</strong><br> http://localhost:3000${url}</p>
          <p><strong style="color:#8E443D;">Namn:</strong><br> ${namn}</p>
          <p><strong style="color:#8E443D;">Telefon:</strong><br> ${telefon}</p>
          <p><strong style="color:#8E443D;">Email:</strong><br> ${email}</p>
          ${antal !== undefined ? `<p><strong style="color:#8E443D;">Antal gäster:</strong><br> ${antal}</p>` : ``}
          <p><strong style="color:#8E443D;">Meddelande:</strong><br> ${meddelande}</p>
        </div>
      </div>
      `,
    })
  } catch (error) {
    console.log(error);
  }
  res.status(200).json(req.body)
}

export default Mail