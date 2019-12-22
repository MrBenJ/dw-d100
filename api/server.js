const express = require('express');
const cors = require('cors');
const apiRoutes = require('./router');

const app = express();
app.options('*', cors());

app.use('/api', apiRoutes);

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
