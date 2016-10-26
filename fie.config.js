var open = require('open');
module.exports = {
    toolkitName: "fie-toolkit-fusion",
    tasks : {
        start : [
            {
                command : 'npm run start'
            }
        ],

        build : [
            {
                //执行一下 gulp的build任务
                command : 'npm run build'
            }
        ],

        open : function(){
            setTimeout(function(){
                open('http://localhost:3000/demo/index.html')
            },3000)
        }
    }
};
