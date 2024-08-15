const crypto = require('crypto');

// Function to hash the password
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Example usage
const password = "user_password";
const hashedPassword = hashPassword(password);
console.log("Hashed Password:", hashedPassword);


const BigInt = require('big-integer');

// Generate a random large prime number for `p`

const p = BigInt('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141', 16); 
const g = BigInt(2); 

// Convert the hashed password to an integer and generate keys
function generateKeys(hashedPassword, g, p) {
    const x = BigInt(hashedPassword, 16); 
    const y = g.modPow(x, p);
    return { x, y };
}


// Example usage
const { x, y } = generateKeys(hashedPassword, g, p);
console.log("Private Key (x):", x.toString());
console.log("Public Key (y):", y.toString());
// Store the public key `y` on the server


// Function to generate a random challenge
function generateChallenge(p) {
    return BigInt.randBetween(1, p.subtract(1)); // Random number between 1 and p-1
}


const c = generateChallenge(p);
console.log("Challenge (c):", c.toString());



// Function to generate proof
function generateProof(x, c, g, p) {
    const r = BigInt.randBetween(1, p.subtract(1)); 
    const R = g.modPow(r, p); 
    const s = r.add(c.multiply(x)).mod(p.subtract(1)); 
    return { R, s };
}

// Example usage
const { R, s } = generateProof(x, c, g, p);
console.log("Commitment (R):", R.toString());
console.log("Response (s):", s.toString());
// Send `R` and `s` to the server


// Function to verify proof
function verifyProof(y, R, s, c, g, p) {

  console.log(y);
  console.log(R);
  console.log(s);
  console.log(c);
  console.log(g);
  console.log(p);
  
    const lhs = g.modPow(s, p); 
    const rhs = R.multiply(y.modPow(c, p)).mod(p); 
    return lhs.equals(rhs);
}

// Example usage
const isValid = verifyProof(y, R, s, c, g, p);
if (isValid) {
    console.log("Authentication successful!");
} else {
    console.log("Authentication failed!");
}


