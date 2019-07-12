<homepage>
    <h1>HOME PAGE</h1>
<div each="{products in opts.products}">
    <p>{opts.username}</p>
   <div><label for="">Post :</label>
    <p><img src="{products.filesURL[0]}" alt="Error"></p>
    <img src="{products.filesURL[1]}" alt=""></div>
    <label for="">Descriptions :</label>
    <p>{products.title}</p>
    <label for="">Likes :</label>
    <p>{products.like}</p>
    
</div>
<div>
<a href="/home?page={opts.pageNo - 1}" mx-disabled={opts.pageNo == 1}>
    <button id="pre">pre</button>
</a>
 
 <span>{opts.pageNo}/{opts.pageTotal}</span>
 <a href="/home?page={opts.pageNo + 1"mx-disabled ={opts.pageNo == opts.pageTotal}> 
    <button id="next">next</button>

</a>
</div>
</homepage>