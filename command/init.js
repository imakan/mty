'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')

module.exports = () => {
	co(function *() {
		// 处理用户输入
		let tplName = yield prompt('Template name: ')
		let projectName = yield prompt('Project name: ')
		let gitUrl
		let branch

		if (!config.tpl[tplName]) {
			console.log(chalk.red('\n × Template does not exit!'))
			process.exit()
		}
		gitUrl = config.tpl[tplName].url
		branch = config.tpl[tplName].branch

		// git命令，远程拉取项目并自定义项目名
		let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`

		console.log(chalk.white('\n Start generating...'))

		exec(cmdStr, (error, stdout, stderr) => {
			if (error) {
				console.log(error)
				process.exit()
			}
			console.log(chalk.green('\n √ 项目构建完成'))
			console.log(`\n cd ${projectName} && npm install \n`)
			process.exit()
		})
	})
}
