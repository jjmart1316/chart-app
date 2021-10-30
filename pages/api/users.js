import dbConnect from '../../util/dbConnect';
import User from '../../models/db/User';

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const { username, email, password, _id} = await User.findOne({ username: req.query.username });
        res.status(200).json({ success: true, username, email, password, _id });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      try {
        const { username, email, password } = req.body?.params;
        const userNameInDB = await User.findOne({ username });
        const userEmailInDB = await User.findOne({ email });

        if (userNameInDB) {
          res.status(200).json({ success: false, error: 'Sorry, that user name is already taken. Please choose another.', errorType: 'username' });
          return;
        }

        if (userEmailInDB) {
          res.status(200).json({ success: false, error: 'Sorry, that email is already taken. Please choose another.', errorType: 'email' });
          return;
        }

        const query = await User.create({ username, email, password });
        res.status(201).json({ success: true, query });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
