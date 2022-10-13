//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Life is a beautiful journey that is meant to be embraced to the fullest every day. However, that doesn't mean you always wake up ready to seize the day, and sometimes need a reminder that life is a great gift.With all of its ups and downs, the journey of life is one that is not easily summed up in words. But luckily for you, our list of inspirational life quotes is filled with powerful sayings and musings from people from all walks of life who have found a way to whittle down the unique lived experiences that make us who we are into a few sentences and phrases.So, keep writing some of the main part of life here and creates your own blog .... ";
const aboutContent = "Hello everyone, myself Md Athar. I am currently a student of Indian Institute of Technology Varanasi, (BHU). My Branch is Electronic and I am in 2-year. Taking about my interest so i am higly compelled and engrossed in web development. I love to code and make it host on web. I am enthusiastic about new opportunities and challenges. I am also a Core member of Animation Club. I want to persue my career in Web Developmen. Building a website is an exercise of willpower. The bells and whistles of the design process are tempting to focus on, but compelling content is what makes a website work for your business.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts=[];

app.get("/",function(req,res){
  res.render("home",{
    StartingContent:homeStartingContent,
    posts:posts
  });
});

app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent});
});
app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});


//Post
app.post("/compose",function(req,res){
  // console.log(req.body.postBody);
  const post = {
    title:req.body.postTitle,
    content:req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});


app.get("/posts/:postName",function(req,res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle=_.lowerCase(post.title);

    if(storedTitle === requestedTitle){
      res.render("post",{
        title:post.title,
        content:post.content
      });


    }
    
  })
})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
