/**
 * repoPicker 用于监听一个远程git仓库，发现有更新就pull下来
 * 前提：
 * 1.在远程git服务供应网站处配置webHook(当然你也可以在本地的文件写脚本监听触发)
 * 2.将该文件放置于项目的根目录并配置需要监听的仓库文件夹目录
 * 3.enjoy autoFlow!
 */

// 配置监听端口
const PORT = 1258;

// 配置监听仓库路径(相对)
const PATH = '/home/back/front_build';

// 配置校验token(目前只支持post)
const TOKEN = "";

// 配置执行pull之后的命令流
const buildRun_flow = (data, fn) => {
	//fn是回调函数
	console.log("下面执行自定义配置流")
};


/*
 * mainCode
 * */
let http = require('http');
let child_process = require('child_process');

http.createServer((req, res) => {
	let data = ''; // 放置请求过来的数据
	let commands = []; // 放置要执行的命令
	switch (req.method) {
		case 'POST':
			console.log('post');
			req.on('data', (chunk) => {
				data += chunk;
			});
			req.on('end', () => {
				data = JSON.parse(data);
				console.log('get token:' + data.token);
				if (data.token == undefined) {
					console.log("wrong token");
					return res.end('wrong token');
				}
				if (data.token === TOKEN) {
					console.log(`get update in ${PATH}`);
					commands = [
						`cd ${PATH}`,
						`echo pull from the originRepo...`,
						`git pull origin master`
					].join('&&');
					child_process.exec(commands, (err, out, errCode) => {
						if (err instanceof Error) {
							res.writeHead(500);
							res.end('Server Internal Error.');
							throw err;
						}
						console.log(out);
						console.log(errCode);
						res.writeHead(200);
						console.log("pull done");
						res.end('Pull done');
					});
					buildRun_flow();
				}
			});
			break;
		case 'GET':
			console.log('get');
			break;
		default:
			console.log('no methods');
			break;
	}
	res.end('res end');
}).listen(PORT);


console.log(`now listen ${PORT}`);