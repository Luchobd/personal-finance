export interface reset0Props {
  name: string;
  password: string;
}

export const reset_0 = ({ name, password }: reset0Props) => {
  const subject = 'Restablecimiento de contraseña';
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
              color: white;
            }
  
            .content .main {
              padding: 0 20px 10px;
            }
  
            h1,
            h2,
            h3,
            h4,
            h6 {
              color: #333;
              text-align: center;
            }
  
            .pass {
              text-align: center;
            }
  
            .pass h2 {
              margin: 0 auto;
              padding: 10px;
              background-color: #FFA451;
              width: min-content;
              border-radius: 5px;
            }
  
            p {
              color: #555;
              line-height: 1.5;
              text-align: justify;
            }
  
            .container > p {
              text-align: center;
            }
  
            h6 {
              color: #DB2424;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="content">
              <div class="header">
                <img src="${process.env.URL_CLIENT}/favicon.ico" alt="">
              </div>
              <div class="main">
                <h1>Tu contraseña cambió</h1>
                <p>${name} gracias por solicitar el restablecimiento de contraseña. Queremos asegurarnos de que es realmente usted. Inicie sesión con la contraseña temporal que encontrarás a continuación y te pedirá que cambies la contraseña por una personal.</p>
                <h3>Contraseña temporal</h3>
                <div class="pass">
                  <h2>${password}</h2>
                </div>
                <h6>(Esta contraseña es válida durante 10 minutos)</h6>
                <hr>
                <p>Haz clic <a href="${process.env.URL_CLIENT}/login">aquí</a> y te llevará a Iniciar sesión</p>
                <p>Nunca se enviará un correo electrónico o se solicitará que revele o verifique su contraseña personal, tarjeta de crédito o número de cuenta bancaria.</p>
              </div>
            </div>
            <p>Calle 30. Anorí, Antioquia, Colombia. © 2023, e-commerce. Todos los derechos reservados. <a href="${process.env.URL_CLIENT}/hilde">E-commerce Hilde.</a></p>
          </div>
        </body>
      </html>
    `;
  return { subject, html };
};
