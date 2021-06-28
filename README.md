# User service

## Setup

1. Install mongodb community edition, [Installation guide(ubuntu 20.04)](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-20-04)
2. Install node modules, `npm install`
3. Install Postman, `sudo snap install postman`
4. Start the server, `npm start`

## Schema

1. Users

```js
const userSchema = new Schema({
  userId: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  middleName: String,
  email: String,
  phone: Number,
  state: String,
  country: String,
  city: String,
  pinCode: String,
  createdOn: { type: Date, default: Date.now },
});
```
