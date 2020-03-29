import mongoose from 'mongoose';
import config from './config/config';
import app from './config/express';

mongoose
  .connect(config.MONGO_DB_HOST as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  })
  .catch((e) => {
    console.log('mongo connection failed');
  });

app.listen(config.PORT, () => {
  console.log(
    `API Server started and listening on port ${config.PORT} in (${config.NODE_ENV})`
  );
});

export default app;
