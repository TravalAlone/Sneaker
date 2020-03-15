// 1.要爬的目标网站

const superagent = require("superagent") //在node端可以发送http请求
const cheerio = require("cheerio") // 可以在node端操作dom
const fs = require("fs") //fs  将获取的数据写入json
const path = require("path") // 解决路径
const url = "https://ncov.dxy.cn/ncovh5/view/pneumonia" //要爬取的目标网站
superagent.get(url).then(res => {
	// node端发起http请求 返回的数据在res.text中
	const $ = cheerio.load(res.text) // 使用cheerio模块中的load方法
	const $getListByCountryTypeService1 = $(
		"#getListByCountryTypeService1"
	).html() // 获取网站中id为getListByCountryTypeService1  的html代码
	const objData = {} // 因为获取的 数据中有window对象 而node端没有 所以设置一个新对象 用来替换window
	eval($getListByCountryTypeService1.replace(/window/g, "objData")) // eval 方法可以运行里面的所有函数 ,
	// 将获取的数据 存入json中
	fs.writeFile(
		path.join(__dirname, "./data.json"),
		JSON.stringify(objData),
		err => {
			if (err) throw err
			console.log("数据写入成功")
		}
	)
})
