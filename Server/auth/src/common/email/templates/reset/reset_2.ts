export const reset_2 = ({ name }: { name: string }) => {
  const subject = 'El tiempo para restablecer la contraseña ha vencido';
  const html = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
            }
  
            .container {
              max-width: 600px;
              margin: 0 auto;
              border-radius: 10px;
              text-align: center;
              border: 1px solid #ffa5513b;
            }
  
            .content {
              background-color: white;
              border-top-left-radius: 11px;
              border-top-right-radius: 11px;
            }
  
            .content .header {
              background-color: #fff2e791;
              border-top-left-radius: 11px;
              border-top-right-radius: 11px;
            }
  
            .content .header img {
              width: 100px;
              display: block;
              margin: 0 auto;
              padding: 20px;
            }
  
            .content .main {
              padding: 0 20px 10px;
            }
  
            h1, h2, h3, h4, h6 {
              color: #333;
              text-align: center;
            }
  
            p, li {
              color: #555;
              line-height: 1.5;
              text-align: justify;
            }
  
            .container > p {
              text-align: center;
            }
  
            a {
              color: #007bff;
              text-decoration: none;
            }
  
            a:hover {
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="content">
              <div class="header">
                <img src="${process.env.URL_CLIENT}/favicon.ico" alt="Logo">
              </div>
              <div class="main">
                <h1>El tiempo para restablecer la contraseña ha vencido</h1>
                <p>${name}, te informamos que el período para restablecer tu contraseña ha vencido. Si aún necesitas cambiar tu contraseña, deberás volver a solicitar el restablecimiento siguiendo estos pasos:</p>
                <ol>
                  <li>Haz clic <a href="${process.env.URL_CLIENT}/reset">aquí</a> para solicitar nuevamente el restablecimiento de contraseña.</li>
                  <li>Ingresa tu correo electrónico y recibirás una contraseña temporal en tu bandeja de entrada.</li>
                  <li>Tienes 10 minutos para cambiar la contraseña temporal por una personal y segura.</li>
                </ol>
                <hr>
                <p>Queremos asegurarte que nunca enviaremos un correo electrónico solicitando que reveles o verifiques tu contraseña personal, tarjeta de crédito o número de cuenta bancaria. Mantenemos la seguridad de tus datos como nuestra máxima prioridad.</p>
              </div>
            </div>
            <p>
              Calle 30. Anorí, Antioquia, Colombia. © 2023, e-commerce. Todos los derechos reservados. 
              <a href="${process.env.URL_CLIENT}/hilde">E-commerce Hilde.</a>
            </p>
          </div>
        </body>
      </html>
    `;
  return { subject, html };
};
