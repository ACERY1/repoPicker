/**
 * repoPicker 用于监听一个远程git仓库，发现有更新就pull下来
 * 前提：
 * 1.在远程git服务供应网站处配置webHook(当然你也可以在本地的文件写脚本监听触发)
 * 2.将该文件放置于项目的根目录并配置需要监听的仓库文件夹目录
 * 3.enjoy autoFlow!
 */

let http = require('http');
let child_process = require('child_process');

// 配置监听端口
const PORT = 1258;

// 配置监听仓库路径(相对)
const PATH = '/home/back/front_build';

// 配置校验token(目前只支持post)
const TOKEN = "";

// 配置执行pull之后的命令流
const buildRun_flow = (data, fn) => {
	//fn是回调函数
};

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
				//前端isFront 后端isBack
				console.log('get token:' + data.token);
				if (data.token == undefined) {
					return res.end('wrong token');
				}
				switch (data.token) {
					case 'isFront':
						console.log('get update in front_build...');
						commands = [
							`cd ${FRONT_PATH}`,
							`echo pull from the frontRepo...`,
							`git pull origin master`
						].join('&&');
						child_process.exec(commands, (err,out,errCode) => {
							if (err instanceof Error) {
								res.writeHead(500);
								res.end('Server Internal Error.');
								throw err;
							}
							console.log(out);
							console.log(errCode);
							res.writeHead(200);
							res.end('Pull done');
						});
						buildRun_flow();
						break;
					case 'isBack':
						console.log('get update in back...');
						commands = [
							`cd ${BACK_PATH}`,
							`echo pull from the backRepo`,
							`git pull origin master`
						].join('&&');
						child_process.exec(commands, (err,out,errCode) => {
							if (err instanceof Error) {
								res.writeHead(500);
								res.end('Server Internal Error.');
								throw err;
							}
							console.log(out);
							console.log(errCode);
							res.writeHead(200);
							res.end('Pull done');
						});
						break;
					default:
						return res.end('wrong token');
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