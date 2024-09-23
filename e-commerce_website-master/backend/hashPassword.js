import bcrypt from 'bcryptjs';

const password = 'Lxgywyl3027'; // Your plain text password
const hashedPassword = bcrypt.hashSync(password, 10);

console.log(hashedPassword);
