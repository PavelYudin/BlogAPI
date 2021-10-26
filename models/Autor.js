const { Pool } = require('pg');
const Blog=require("../models/Blog");
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: 'p232kv20',
  port: 5433,
});

class Autor{
  static createAutor(nameAutor){
    const sqlAddAutor="insert into Autors (nickName) values ($1)";
    return pool.query(sqlAddAutor,[nameAutor]);
  }
  static checkAutor(nameAutor){
    const sqlGetAutor="select nickName from Autors where nickName=$1";
    return pool.query(sqlGetAutor,[nameAutor])
    .then(result=>{
      if(!result.rows.length) return Promise.reject(new Error("no autor"));
      return Promise.resolve();
    })
  }
  static createArticle(title,contents,nameAutor,categories){
      return Autor.checkAutor(nameAutor)
        .then(()=>{
          return Blog.checkCategory(categories);
        })
        .then(arrCategoriesId=>{        
          const sqlAddArticle="insert into Articles (title,contents,autorid) values ($1,$2,$3) RETURNING id";
          return pool.query(sqlAddArticle,[title,contents,nameAutor])
              .then(result=>{
                  const articleId=result.rows[0].id;
                  const sqlAddKeycategoryarticle="insert into categoryarticle (categoryid,articleid) values ($1,$2)";
                  const arrPromise=arrCategoriesId.map(categoryId=>{
                      return pool.query(sqlAddKeycategoryarticle,[categoryId,articleId])
                  });
                  return Promise.all(arrPromise)            
              })
        })
  }
  static createCommentArticle(contents,articleId,nameAutor){
    const sqlAddCommentArticle="insert into commentsarticle (contents,articleId,autorId) values ($1,$2,$3)";
    return pool.query(sqlAddCommentArticle,[contents,articleId,nameAutor])
  }
  static getInfoArticle(articleId){
    const sqlGetInfoArticle="select id, title, contents,autorid, dateadd from articles where id=$1;";
    return pool.query(sqlGetInfoArticle,[+articleId])
      .then(result=>{return Promise.resolve(result.rows)});
  }
  static getCommentsArticle(articleId){
    const sqlGetCommentsArticle=`
      select commentsarticle.contents, commentsarticle.autorid from commentsarticle
      JOIN articles ON articles.id=commentsarticle.articleid
      where articles.id=$1;
    `;
    return pool.query(sqlGetCommentsArticle,[articleId])   
      .then(result=>{return Promise.resolve(result.rows)});
  }
}

module.exports=Autor;
