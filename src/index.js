import {mxFirebase} from './mx';
import './mx.css';
import './index.css';
import riot from 'riot';

import './tags/homepage.tag';
import './tags/signin.tag';
import './tags/upload.tag';
import route from 'riot-route';





var firebaseConfig = {
    apiKey: "AIzaSyBFPNyJvxq8Ym9p6-aUWbwIdgQ28WbDzUE",
    authDomain: "uselessproject-6ce81.firebaseapp.com",
    databaseURL: "https://uselessproject-6ce81.firebaseio.com",
    projectId: "uselessproject-6ce81",
    storageBucket: "uselessproject-6ce81.appspot.com",
    messagingSenderId: "273060580962",
    appId: "1:273060580962:web:8873dc825e6c585e"
  };

mxFirebase.init(firebaseConfig);

route.base("/")
route("/home..", async() => {
 
  // console.log(products[1]._id)
  const query = route.query()
 console.log(query.page)
  console.log(query)

  
  const page = await mxFirebase.collection("products").paginate(query.page, 9);
  console.log(page)
  const opts = {
username: "testAccount",
products: page.data,
pageNo: 1,
pageTotal: 10,

}
  const homePage = riot.mount("div#root", "homepage", opts);
});

route("/signin", () => {
const signin = riot.mount("div#root", "signin"); 
console.log(document.getElementById("form1"))
document.getElementById("form1").addEventListener("submit",async (e) =>{
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
 
  try{
    await mxFirebase.signIn(email, password);
    alert("Sucessful log in")
    window.location.href = "/home?page=1"  
}   catch(err) {   
  document.getElementById("Error1").innerText = err.message;
}
})
    
})
route("/upload", () => {
  const upload = riot.mount("div#root", "upload");
  document.getElementById("uploadForm").addEventListener("submit", async(e) =>{
    e.preventDefault();
    // const emotion = document.querySelector('input[name=Emotion]:checked').value;
    const title = document.getElementById("descriptions").value;
    const files = [];
  document.querySelectorAll("input[type=file]").forEach(element => {
    if (element.files[0]) {
      files.push(element.files[0])
    }

  });
//   const category = document.getElementById("category").value;
//  console.log(emotion);
//  console.log(title);
//  console.log(files);
//  console.log(category);
 let like = 0;
 const filesURL = await mxFirebase.putFiles(files);
  const r = await mxFirebase.collection('products').save({
title,
// category,
filesURL,
like,
  })
console.log(r)
alert("Thank you");
window.location.href = "/home?page=1"

})})


route.start(true)

