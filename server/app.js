const express = require('express');
const app = express();
const mongoose = require('mongoose');
const formsRouter = require('./forms/form.router');
const userRouter = require('./user/user.router');
const devConfig = require('./env/development');
const accessRouter = require('./accessrights/accessrights.router');
const setGlobalMiddleware = require('./middleware/global-middleware');

var PORT = devConfig.port;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
// registered Global middleware
setGlobalMiddleware(app);
app.use('/forms', formsRouter);
app.use('/users', userRouter);
app.use('/accessRights', accessRouter)

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
// mongoose.connect('mongodb://sabaricse:sabari_kiot123@cluster0-shard-00-00-tkdtu.mongodb.net:27017,cluster0-shard-00-01-tkdtu.mongodb.net:27017,cluster0-shard-00-02-tkdtu.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority');
// const 
// DB server connectivity
// mongodb+srv://sabaricse:<password>@cluster0-tkdtu.mongodb.net/test?retryWrites=true&w=majority
// `mongodb://root:caputdraconis@159.89.170.214:${PORT}/${devConfig.database}`
mongoose.connect('mongodb://sabaricse:sabari_kiot123@cluster0-shard-00-00-tkdtu.mongodb.net:27017,cluster0-shard-00-01-tkdtu.mongodb.net:27017,cluster0-shard-00-02-tkdtu.mongodb.net:27017/formBuilder?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', (err) => {
    if (err) { console.log(err) } else {
        console.log('DB connected successfully');
    }
    // console.log('Sorry Unable to Connect');
});
