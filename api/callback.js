export default async function handler(req, res) {
  const { code } = req.query;
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;

  try {
    // Pedimos el pase de acceso a GitHub
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json' 
      },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });
    
    const data = await response.json();
    const token = data.access_token;
    
    if (token) {
      // Si hay éxito, le mandamos la llave a tu panel y cerramos la ventana
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
          <head><title>Autorizado</title></head>
          <body style="font-family: Arial; padding: 20px; text-align: center;">
            <h2>¡Autorización exitosa!</h2>
            <p>Iniciando sesión en tu panel de administrador...</p>
            <script>
              // Le pasamos la llave a la pestaña principal
              window.opener.postMessage(
                'authorization:github:success:{"token":"${token}","provider":"github"}',
                '*'
              );
              // Cerramos esta ventanita después de 1 segundo
              setTimeout(() => window.close(), 1000);
            </script>
          </body>
        </html>
      `);
    } else {
      // Si algo falla, ahora sí veremos el error exacto
      res.status(400).send(`Error: No se pudo obtener el token. Detalles: ${JSON.stringify(data)}`);
    }
  } catch (error) {
    res.status(500).send(`Error interno del servidor: ${error.message}`);
  }
}