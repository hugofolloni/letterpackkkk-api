const express = require('express');
const database = require('./database');

const router = express.Router();

const replace = (str, oldArg, newArg) => {
    for(let i = 0; i < oldArg.length; i++) {
        if(str.includes(oldArg[i])){
            str = str.replace(oldArg[i], newArg[i]);
        }
    }
    return str;
}

const GETQueries = [
    {
        query: 'SELECT * FROM `users`',
        route: '/users'
    },
    {
        query: 'SELECT * FROM `watchlist',
        route: '/watchlist'
    }
]

GETQueries.forEach((query) => {
    router.get(query.route, async(req, res) => {
        res.send(await database.query(query.query));
    })
})

const paramsQuery = [
    {
        query: 'SELECT * FROM `users` WHERE `name` = userToChange',
        route: '/users/:name'
    }, 
    {
        query: 'SELECT * FROM `watchlist` WHERE `user_id` = userIDToChange',
        route: '/watchlist/:id'
    },
    {
        query: 'SELECT COUNT(*) FROM `watchlist` WHERE `user_id` = userIDToChange',
        route: '/watchlist/:id/count'
    },
    {
        query: 'SELECT COUNT(*) FROM `watchlist` WHERE `movie_id` = movieIDToChange',
        route: '/watchlist/movie/:id/count'
    }
]

paramsQuery.forEach((query) => {
    router.get(query.route, async(req, res) => {
        const oldArg = ['userToChange', 'userIDToChange', 'movieIDToChange'];
        const newArg = [req.params.name, req.params.user_id, req.params.movie_id];
        const newQuery = replace(query.query, oldArg, newArg);
        res.send(await database.query(newQuery));
    })
})

const POSTQueries = [
    {
        query: 'INSERT INTO `users` (`name`, `email`, `password`) VALUES (nameToChange, emailToChange, passwordToChange)',
        route: '/users'
    },
    {
        query: 'INSERT INTO `watchlist` (`user_id`, `movie_id`) VALUES (userIDToChange, movieIDToChange)',
        route: '/watchlist'
    }
]

POSTQueries.forEach((query) => {
    router.post(query.route, async(req, res) => {
        const oldArg = ['nameToChange', 'emailToChange', 'passwordToChange', 'userIDToChange', 'movieIDToChange'];
        const newArg = [req.body.name, req.body.email, req.body.password, req.body.user_id, req.body.movie_id];
        const newQuery = replace(query.query, oldArg, newArg);
        res.send(await database.query(newQuery));
    })
})

const PUTQueries = [
    {
        query: 'UPDATE `users` SET `name` = nameToChange, `email` = emailToChange, `password` = passwordToChange WHERE `name` = userToChange',
        route: '/users/:name'
    },
    {
        query: 'UPDATE `watchlist` SET `user_id` = userIDToChange, `movie_id` = movieIDToChange WHERE `user_id` = userIDToChange',
        route: '/watchlist/:id'
    }
]

PUTQueries.forEach((query) => {
    router.put(query.route, async(req, res) => {
        const oldArg = ['nameToChange', 'emailToChange', 'passwordToChange', 'userToChange', 'userIDToChange', 'movieIDToChange'];
        const newArg = [req.body.name, req.body.email, req.body.password, req.params.name, req.body.user_id, req.body.movie_id];
        const newQuery = replace(query.query, oldArg, newArg);
        res.send(await database.query(newQuery));
    })
})

const DELETEQueries = [
    {
        query: 'DELETE FROM `users` WHERE `name` = userToChange',
        route: '/users/:name'
    },
    {
        query: 'DELETE FROM `watchlist` WHERE `user_id` = userIDToChange',
        route: '/watchlist/:id'
    },
    {
        query: 'DELETE FROM `watchlist` WHERE `movie_id` = movieIDToChange AND `user_id` = userIDToChange',
        route: '/watchlist/:id/:movie_id'
    }
]

DELETEQueries.forEach((query) => {
    router.delete(query.route, async(req, res) => {
        const oldArg = ['userToChange', 'userIDToChange', 'movieIDToChange'];
        const newArg = [req.params.name, req.params.user_id, req.params.movie_id];
        const newQuery = replace(query.query, oldArg, newArg);
        res.send(await database.query(newQuery));
    })
})

module.exports = router; 
