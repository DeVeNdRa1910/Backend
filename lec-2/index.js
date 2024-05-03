const fs = require("fs")

/* Hame file sysytem me kya kya learn karna hai
writefile => file create karna
syntax: fs.writeFile(file, data[, options], callback)

appendfile => jo file writefile se create kee thi usme kuchh add karna hai to use appendfile
syntax: fs.appendFile(file, data[, options], callback)

copyfile => copy then file ands past on different destination you can change name also
syntax: fs.copyFile(file, destination[,mode], callback)

rename => If you want to rename the file
syntax: fs.renameFile(file, newName, callback)

unlink => delete file from a perticular directory
syntax: fs.unlink(path, callback)
*/


//Create File
/* 
// file create ho chuki he isiliye ise comment kiya hai
fs.writeFile("hey.tex", "hey Devendra welcome to Backend" , function(err){
    if(err) console.log(err);
    else console.log("DONE");
} ) 
*/


//Add somthing in old File
/* 
fs.appendFile("hey.tex", " please complete this Backend series ASAP" , function(err){
    if(err) console.log(err);
    else console.log("DONE");
} )
*/

//Create File
/*
fs.rename("hey.tex", "Temp.text" , function(err){
    if(err) console.log(err);
    else console.log("DONE");
})
*/

/* 
//copy  file 
fs.copyFile("Temp.text", "./copyByFs/newName.text", function(err){
    if(err) console.log(err.message);
    else console.log("DONE");
}) 
*/

//Delete File
/* 
fs.unlink("./copyByFs/newName.text" , function(err){
    if(err) console.log(err.message);
    else console.log("DONE");
}) 
*/


//HTTP
const http = require("http")

const server = http.createServer(function(req, res){
    res.end("Hello Backend");
})

server.listen(3000)