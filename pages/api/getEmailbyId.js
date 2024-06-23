export default async function handler(req, res) {
    const { id } = req.query;
  
    if (!id) {
      return res.status(400).json({ error: 'User ID is required' });
    }
  
    try {
      const response = await fetch(`https://reqres.in/api/users/${id}`);
      const data = await response.json();
      res.status(200).json(data.data.email);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  