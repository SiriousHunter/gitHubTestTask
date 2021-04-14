'use strict';
var express = require('express');
var router = express.Router();
var db = require('../lib/db')

/* GET home page. */
router.get('/repos', async (req, res, next) => {
    let name = req.query.name
    let gitId = req.query.gitId

    try {

        if (name) {
            var data = await db.fetchOneRepo(name)
        } else if (gitId) {
            var data = await db.fetchOneRepo(undefined, gitId)
        } else {
            var data = await db.fetchAllRepos()
        }


        if(data.length <= 0) res.sendStatus(404)
    } catch (err) {
        next(err)
    }


    res.json(data)
});

router.get('/sync', async (req, res, next) => {

    try {

        res.parser.stop()
        if (res.parser.isRun) return sendStatus(500)

        res.parser.start()

        if (!res.parser.isRun) return sendStatus(500)
    } catch (err) {
        next(err)
    }


    res.send("œ¿–—≈– –¿¡Œ“¿≈“")
});


module.exports = router;
