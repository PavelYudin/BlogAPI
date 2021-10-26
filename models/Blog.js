const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: 'p232kv20',
  port: 5433,
});

class Blog{
  static createCategory(nameCategory){
    const sqlAddCategory="insert into Categories (categoryName) values ($1)";
    return pool.query(sqlAddCategory,[nameCategory]);
  }
  static checkCategory(categories){
    const sqlGetCategoty="select id from Categories where categoryName =$1";
    const arrPromise=categories.map(category=>{
            return pool.query(sqlGetCategoty,[category])
    });
    return Promise.all(arrPromise)
      .then(result=>{
        const arrCategoriesId=result.map(obj=>{
          if(obj.rowCount==1) return obj.rows[0].id;
        }).filter(id=>id);
        if(arrCategoriesId.length!=categories.length) return Promise.reject(new Error("no category"));
        return Promise.resolve(arrCategoriesId);
      });
  }
  static getArticlesCategory(nameCategory){
    const sqlGetArticles=`
      SELECT articles.title, articles.id, articles.autorid
      FROM categoryarticle
      JOIN articles ON articles.id = categoryarticle.articleid
      JOIN categories ON categories.id=categoryarticle.categoryid 
      where categories.categoryname=$1 order by articles.dateadd desc;
    `;
    return pool.query(sqlGetArticles,[nameCategory])
      .then(result=>Promise.resolve(result.rows));
  }
}

module.exports=Blog;
