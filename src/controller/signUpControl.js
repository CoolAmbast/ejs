
const signUpControl = (req, res) => {
  const { username, email, password } = req.body;
  console.log('Received signup data:', { username, email, password });
  res.send('Signup successful!');
}

export default signUpControl