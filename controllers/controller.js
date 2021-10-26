const Autor=require("../models/Autor");
const Blog=require("../models/Blog");

exports.createAutor=(req,res)=>{
    if(!req.body) return res.sendStatus(400);  
    let {nameAutor} = req.body;
    if(!nameAutor) return res.sendStatus(400);
    nameAutor=nameAutor.trim();
    Autor.createAutor(nameAutor)
        .then(()=>res.sendStatus(200))
        .catch(err=>{console.log(err);res.status(400).send(err.message)});
};
exports.createArticle=(req,res)=>{
    if(!req.body) return res.sendStatus(400);  
    let {title,contents,nameAutor,categories} = req.body;
    if(!title || !contents || !nameAutor || !categories.length) return res.sendStatus(400);
    title=title.trim();
    contents=contents.trim();
    const arrValidCategories=categories.filter(category=>category!="");
    if(arrValidCategories.length!=categories.length) return res.sendStatus(400);
    Autor.createArticle(title,contents,nameAutor,categories)
        .then(()=>res.sendStatus(200))
        .catch(err=>{
            console.log(err);
            res.status(400).json({error:err.message});
        });
};

exports.createCategory=(req,res)=>{
    if(!req.body) return res.sendStatus(400);  
    let {nameCategory} = req.body;
    if(!nameCategory) return res.sendStatus(400);
    nameCategory=nameCategory.trim();// не нужна
    Blog.createCategory(nameCategory)
        .then(()=>res.sendStatus(200))
        .catch(err=>{
            console.log(err);
            res.status(400).send(err.message);
        });
};

exports.getArticlesCategory=(req,res)=>{
    const nameCategory=req.params["nameCategory"];
    Blog.getArticlesCategory(nameCategory)
        .then(result=>res.json(result))
        .catch(err=>{
            console.log(err);
            res.sendStatus(404);
        });
}

exports.getInfoArticle=(req,res)=>{
    const articleId=req.params["articleId"];
    Autor.getInfoArticle(articleId)
        .then(result=>res.json(result))
        .catch(err=>{
            console.log(err);
            res.sendStatus(404);            
        });
}

exports.createCommentArticle=(req,res)=>{
    if(!req.body) return res.sendStatus(400);
    let {contents,articleId,nameAutor}=req.body;
    contents=contents.trim();
    if(!contents) return res.sendStatus(400);
    Autor.createCommentArticle(contents,articleId,nameAutor)
        .then(()=>res.sendStatus(200))
        .catch(err=>{
            console.log(err);
            res.sendStatus(400);
        });
}

exports.getCommentsArticle=(req,res)=>{
    const articleId=req.params["articleId"];
    Autor.getCommentsArticle(articleId)
        .then(result=>res.json(result))
        .catch(err=>{
            console.log(err);
            res.sendStatus(404);            
        });
}