const bcrypt = require('bcrypt');

export default async (req: any, res: any) => {
  if (req.method === "POST")
  {
    const {name, email, password} = req.body;

    try
    {
      const hash = await bcrypt.hash(password, 0);
      const payload = {
        name: name,
        email: email,
        password: hash,
      };

      const res = await fetch(process.env.API_URI + '/v1/user_registration', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'en-US',
        },
      });

      return res.ok;
    }
    catch (err: any)
    {
      return res.status(503).json({err: err.toString()});
    }
  }
  else
  {
    return res.status(405).json({error: "This request only supports POST requests"})
  }
}