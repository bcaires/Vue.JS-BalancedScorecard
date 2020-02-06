const admin = require('./admin')
module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validationToken', app.api.auth.validationToken)


    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(admin(app.api.user.get))

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getById))
        .delete(admin(app.api.user.remove))

    app.route('/countUsers')
        .all(app.config.passport.authenticate())
        .get(app.api.user.getUsersActiveAndInactives)

    app.route('/perspectives')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.perspectives.save))
        .get(admin(app.api.perspectives.get))

    app.route('/perspectiveForMap')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.perspectives.getPerspectiveForMap))

    app.route('/perspectives/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.perspectives.getTree)

    app.route('/perspectives/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.perspectives.getById)
        .put(admin(app.api.perspectives.save))
        .delete(admin(app.api.perspectives.remove))

    app.route('/map/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.map.getTree1)

    app.route('/map/strategy')
        .all(app.config.passport.authenticate())
        .get(app.api.map.getTree2)

    app.route('/map')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.map.save))
        .get(admin(app.api.map.get))

    app.route('/map/:id')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.map.getById))
        .put(admin(app.api.map.save))
        .delete(admin(app.api.map.remove))

    app.route('/objectives')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.objectives.get))
        .post(admin(app.api.objectives.save))

    app.route('/countObjectives')
        .all(app.config.passport.authenticate())
        .get(app.api.objectives.objectivesCompletedAndNotCompleted)

    app.route('/objectives/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.objectives.getById)
        .put(admin(app.api.objectives.save))
        .delete(admin(app.api.objectives.remove))

    app.route('/objectives/:id/perspectives')
        .all(app.config.passport.authenticate())
        .get(app.api.objectives.getByPerspective)



    app.route('/stats')
        .all(app.config.passport.authenticate())
        .get(app.api.stats.get)
}