export const validateEmail_1 = ({ name }: { name: string }) => {
  const subject = 'Recordatorio cambio de Correo Electrónico';
  const html = `<html>
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
                            h1, p {
                                color: #333;
                                text-align: center;
                            }
                            p {
                                color: #555;
                                line-height: 1.5;
                                text-align: justify;
                            }
                            .container>p {
                                text-align: center;
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
                                    <h1>Tu cambio de correo electrónico está próximo a vencer</h1>
                                    <p>${name}, te recordamos que tu solicitud de cambio de correo electrónico está próxima a vencer. Para evitar que se cancele, te recomendamos realizar la validación en el enlace que se envió en un correo anterior.</p>
                                    <p>Si no completas estos pasos en los próximos 5 minutos, se cancelará el cambio de correo electrónico.</p>
                                </div>
                            </div>
                            <p>Calle 30. Anorí, Antioquia, Colombia. © 2023, e-commerce. Todos los derechos reservados. <a href="${process.env.URL_CLIENT}/hilde">E-commerce Hilde.</a></p>
                        </div>
                    </body>
                </html>`;
  return { subject, html };
};
