'use strict';
const axios  = require('axios')
const moment = require('moment')
const db = require('../lib/db')

class Parser {


    isRun    = false        //Работает ли парсер
    interval = 30           //Время обновления в секундах 
    size     = 10           //Количество репозиториев 

    constructor(interval,size) {
        this.interval = (interval || interval > 30)? interval : 30
        this.size = (size || size > 10 )? size : 10
    }

    async getRepos() {
        console.log(`[${moment().format('YYYY-MM-DD HH:MM:SS')}] PARSER: getRepos`)
        /*
        тк в API гитхаба нет возможности получить список популярных репозиториев со страницы https://github.com/trending 
        Здесь данные получаются из API поиска по гитхабу, указанное в свойстве size количество репозиториев, отсортированных по наибольшему количеству звезд и имеющих обновления сегодня. 
        При необходимости можно переписать и получать страницу https://github.com/trending с нужными параметрами и парсить html, получая репозитории в том же виде.
        */
        let date = moment().format('YYYY-MM-DD')
        try {
            let res = await axios.get(`http://api.github.com/search/repositories?q=pushed:${date}&sort=stars&order=desc`)
            if (res.status != 200) return this.stop()   // Здесь должна быть логика обработки разных ответов 


            let data = []
            let j = (res.data.items.length > 0) ? this.size : res.data.items.length

            for (let i = 0; i < j; i++) {
                let item = res.data.items[i]
                let arr = []
                arr.push(item.id)
                arr.push(item.name)
                arr.push(item.stargazers_count)
                arr.push(item.watchers)
                arr.push(item.html_url)
                data.push(arr)
            }

            console.log(`[${moment().format('YYYY-MM-DD HH:MM:SS')}] PARSER: ${data.length} repos was received`)
            return data
        } catch (error) {
            console.error(error)
            this.stop()
        }



    }

    async saveData(data) {
        console.log(`[${moment().format('YYYY-MM-DD HH:MM:SS')}] PARSER: saveData`)
        if (!data) return
        try {
            var res = await db.saveBulkRepos(data)
            if (res) console.log(`[${moment().format('YYYY-MM-DD HH:MM:SS')}] PARSER: ${res.message}`)
            
        } catch (err) {
            console.log(err)
            this.stop()
        }

        return res
    }

    start() {
        console.log(`[${moment().format('YYYY-MM-DD HH:MM:SS')}] PARSER: start`)
        if (this.isRun) return
        this.isRun = true


        function tick() {
            console.log(`[${moment().format('YYYY-MM-DD HH:MM:SS')}] PARSER: tick`)
             /*
              Отсчет до след. запроса начинается сразу же после отправки предыдущего, не дожидаясь его выполнения. Если важна точность, необходимо переписать функции tick и stop. 
              */
            if (!this.isRun) return


            this.getRepos().then(
                (data) => {
                    this.saveData(data)
                },
                (err) => {
                    console.error(err)
                    this.stop()
                })
                

            this.timer = setTimeout(tick.bind(this), this.interval * 1000);

        }

        this.timer = setTimeout(tick.bind(this), 0)
        console.log('Парсер работает')
    }

    stop() {
        console.log(`[${moment().format('YYYY-MM-DD HH:MM:SS')}] PARSER: stop`)
        if (!this.isRun) return

        clearInterval(this.timer)
        this.isRun = false


        console.log('Парсер не работает')
    }

}

module.exports = Parser
