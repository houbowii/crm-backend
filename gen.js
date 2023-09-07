const fs = require("fs");
const userlist = [];
const dict = ["wang", "li", "zhao", "zhou", "du", "zhu", "xing", "xin", "yue", "le", "er", "rui", "hao", "zhi"];
let su = 0;
for(let i=0; i<500; i++){
    let per_name;
    let per_psd;
    
    per_name = dict[i%dict.length]+2023+i;
    per_psd = "mima"+dict[i%dict.length]+1000+i;
    
    const user = {
        "username": per_name,
        "password": per_psd
    };

    userlist.push(user);
    su++;
}
fs.writeFileSync("./data/user.json", JSON.stringify(userlist));
console.log(`user已经生成${su}个`)