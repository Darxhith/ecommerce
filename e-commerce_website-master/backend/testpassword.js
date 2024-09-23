import bcrypt from 'bcryptjs';

// Password from the database (hash)
const hashedPassword = '$2a$10$BgF6uFEEi.pAymNvLhTkc.uy1zMPw7yR.MYaQ9aGrcTlXzarN3ize';

// Password you want to check
const passwordToCheck = 'Lxgywyl3027';

const match = bcrypt.compareSync(passwordToCheck, hashedPassword);
console.log('Password match:', match);
