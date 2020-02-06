const queries = require('./queries')
module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        //POST E PUT
        const objective = {  ...req.body }
        if (req.params.id) objective.id = req.params.id
        try {
            existsOrError(objective.name, 'Nome do objetivo não foi informado')
            existsOrError(objective.indicators, 'Indicadores não foram informados')
            existsOrError(objective.content, 'Conteúdo do objetivo não foi informado')
            existsOrError(objective.userId, 'Responsável pelo objetivo não foi informado')
            // existsOrError(objective.priority, 'É necessário informar a prioridade.')
            existsOrError(objective.perspectiveId, 'Perspectiva que o objetivo pertence não foi informada.')

        } catch (msg) {
            res.status(400).send(msg)
        }

        if (objective.id) {
            app.db('objectives')
                .update(objective)
                .where({ id: objective.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('objectives')
                .insert(objective)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('objectives').where({ id: req.params.id }).del()
            try {
                existsOrError(rowsDeleted, 'Objetivo não foi encontrado')
            } catch (err) {
                return res.status(400).send(err)
            }
            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    const objectivesCompletedAndNotCompleted = async (req, res) => {
        const completed = await app.db('objectives').count('id').where('percentage', 100).first()
        const completedCount = parseInt(completed.count)
        const notCompleted = await app.db('objectives').count('id').where('percentage', '<', 100).first()
        const notCompletedCount = parseInt(notCompleted.count)
        const stoped = await app.db('objectives').count('id').whereNull('percentage').first()
        const stopedCount = parseInt(stoped.count)
        app.db('objectives')
        .then(objectives => res.json({completedCount, notCompletedCount, stopedCount}))
        .catch(err => res.status(500).send(err))
    }

    //todas as consultas abaixo são paginadas.
    const limit = 5;
    const get = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('objectives').count('id').first()
        const count = parseInt(result.count)

        app.db('objectives')
            .select('id', 'name', 'indicators', 'expiration', 'percentage')
            .limit(limit).offset(page * limit - limit)
            .then(objectives => res.json({ data: objectives, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('objectives')
            .where({ id: req.params.id })
            .first()
            .then(objectives => {
                objectives.content = objectives.content.toString()
                return res.json(objectives)
            })
            .catch(err => res.status(500).send(err))
    }

    const getByPerspective = async (req, res) => {
        /* Consultas recursivas, pela perspectiva acesso os objetivos */
        const perspectiveId = req.params.id
        const page = req.query.page || 1
        const perspectives = await app.db.raw(queries.perspectiveWithChildren, perspectiveId)
        const ids = perspectives.rows.map(a => a.id)

        app.db({ o: 'objectives', u: 'users' })
            .select('o.id', 'o.name', 'o.indicators', 'o.priority', 'o.expiration', 'o.percentage',{ author: 'u.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'o.userId'])
            .whereIn('perspectiveId', ids)
            .orderBy('o.priority', 'desc')
            .then(objs => res.json(objs))
            .catch(err => res.status(500).send(err))
    }
    return { save, remove, get, getById, getByPerspective, objectivesCompletedAndNotCompleted }
}