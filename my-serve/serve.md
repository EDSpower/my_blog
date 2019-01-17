   服务器接口文档

   接口名字                 接口路径          参数        返回的内容
| 获取随手笔记的文章列表 | '/pank/postslist' | 无 | [{title:'移动端rem的使用'},{content:'文章内容'},{readNum:'阅读数量'},{comment:'评论'}，{commentNum:'评论数量'}，time:'创作时间'] 
| 新增文章              | '/insert'         |  {title:'标题'，'content':'文章内容','class':'文章分类'，path:'posts+id'} | {flag:true}
| 查询一篇文章          | '/select'         | id:"文章id"    |   一条文章