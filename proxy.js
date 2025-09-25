export default async function handler(req, res) {
  const { endpoint } = req.query;

  const url = `https://api.telegram.org/${endpoint}`;

  try {
    const telegramRes = await fetch(url, {
      method: req.method,
      headers: {
        ...(req.headers["content-type"] && { "content-type": req.headers["content-type"] }),
      },
      body: req.method === "POST" ? req.body : undefined,
    });

    const data = await telegramRes.text();
    res.status(telegramRes.status).send(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy failed", details: error.message });
  }
}