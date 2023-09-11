const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const app = express();
const port = process.env.PORT || 3000;

const users = [{
    "_id": "04764a7f-f5d8-4bf2-a286-28da92f36a22",
    "username": "pepito",
    "password": "$2b$10$FUnBxQHeAk6Y8zrpoGDgFeRkJBVCPR6wkLefjv/Q6j9NiUxbOjbUi"
},
{
    "_id": "12323a-f5d8-4bf2-a286-28da92f36a22",
    "username": "jaimito",
    "password": "$2b$10$FUnBxQHeAk6Y8zrpoGDgFeRkJBVCPR6wkLefjv/Q6j9NiUxbOjbUi"
},
{
    "_id": "45645f-f5d8-4bf2-a286-28da92f36a22",
    "username": "mileisito",
    "password": "$2b$10$FUnBxQHeAk6Y8zrpoGDgFeRkJBVCPR6wkLefjv/Q6j9NiUxbOjbUi"
}];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/usuarios', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      _id: uuid.v4(),
      username,
      password: hashedPassword,
    };

    users.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});

app.get('/api/usuarios', (req, res) => {
  res.status(200).json(users);
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
