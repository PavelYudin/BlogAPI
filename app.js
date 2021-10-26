const express = require('express');
const router = require('./routes/index');
const articlesRouter = require('./routes/articlesRouter');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use("/articles",articlesRouter);
app.use("/", router);


app.use(function(req, res, next){
    res.status(404);
    res.json({message: "not found"});   
})
  
const server = app.listen(PORT,()=>{  
    console.log('The server is listening on port ' + server.address().port);
})