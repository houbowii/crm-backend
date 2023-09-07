const express = require("express");
const os = require("os");
const server = express();
const port = 8888;
const fs = require("fs");
const cors = require("cors");

const networkinterfaces = os.networkInterfaces();
Object.keys(networkinterfaces).forEach(interfacename=>{
    const interfacedata = networkinterfaces[interfacename];
    interfacedata.forEach(interfaceinfo=>{
        if (interfaceinfo.family==='IPv4' && !interfaceinfo.internal){
            console.log(`ipv4: ${interfaceinfo.address}`)
        }
    })
})
server.use(express.urlencoded({extended: false}));
server.use(express.json());
server.use(cors())

const userData = JSON.parse(fs.readFileSync("./data/user.json"));

server.get("/get", (req, res)=>{
    // console.log(req);
    res.status(200);
    res.send("this is a response")
})

server.post("/login", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const user = userData.find(user=>user.username === username && user.password === password);
    res.status(200);
    if (user) {    
        res.send("登录成功")
    } else {
        res.send("登录失败")
    }
})


server.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.send({
        error: {
            message: err.message || "server error"
        }
    })    
}
)

server.listen(port, ()=>{
    console.log(`listening at: ${port}`);
})