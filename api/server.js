const express = require('express');
const apiRoutes = require('./router');

const app = express();
app.use('/api', apiRoutes);
const PORT = 3333;
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
