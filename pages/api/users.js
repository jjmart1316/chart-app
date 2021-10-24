import dbConnect from '../../util/dbConnect';
import User from '../../models/User';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const query = await User.findOne({ username: req.query.username });
        res.status(200).json({ success: true, query });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':

      try {
        const { username, email, password } = req.body?.params;
        const secret = await hash(password, 12);
        const query = await User.create({
          username,
          email,
          password: secret,
        });

        console.log('query:', query);

        res.status(201).json({ success: true, query });
      } catch (error) {
        console.log('error:', error);
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
