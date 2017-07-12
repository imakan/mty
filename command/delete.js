/**
 * Created by makan on 2017/7/12.
 */
'use strict'
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')
const fs = require('fs')

module.exports = () => {
	co(function *() {
		// 接收用户输入的参数
		let tplName = yield prompt('Template name: ')

		// 删除对应的模板
		if (config.tpl[tplName]) {
			config.tpl[tplName] = undefined
		} else {
			console.log(chalk.red('该模板不存在!'))
			process.exit()
		}

		// 写入template.json
		fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config),     'utf-8', (err) => {
			if (err) console.log(err)
			console.log(chalk.green('模板已删除!'))
			console.log(chalk.grey('最近的模板列表是: \n'))
			console.log(config)
			console.log('\n')
			process.exit()
		})
	})
}
