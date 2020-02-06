module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res) => {
        //POST E PUT
        const perspective = {
            id: req.body.id,
            name: req.body.name,
            parentId: req.body.parentId
        }
        if (req.params.id) perspective.id = req.params.id

        try {
            existsOrError(perspective.name, 'Nome não informado')
            if(perspective.id && perspective.parentId ){    
                const subperspective = await app.db('perspectives').where({ parentId: perspective.id })    
                notExistsOrError(subperspective, 'Perspective possui subperspectivas.') 
            } 
        } catch (msg) {
            return res.status(400).send(msg)
        }

       
        

        if (perspective.id) {
            if(perspective.id == perspective.parentId) perspective.parentId = null 
            app.db('perspectives')
                .update(perspective)
                .where({ id: perspective.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('perspectives')
                .insert(perspective)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }
    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Perspectiva não foi informada')

            const subPerspective = await app.db('perspectives').where({ parentId: req.params.id })
            notExistsOrError(subPerspective, 'Não pode excluir, perspectiva possui sub-perspectivas.')

            const objectives = await app.db('objectives').where({ perspectiveId: req.params.id })
            notExistsOrError(objectives, 'Não pode excluir, perspectiva possui objetivos cadastrados.')

            const perspective = await app.db('perspectives').where({ id: req.params.id }).del()
            existsOrError(perspective, 'Perspectiva não foi selecionada')

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    const withPath = perspectives => {
        const getParent = (perspectives, parentId) => {
            let parent = perspectives.filter(parent => parent.id === parentId)
            return parent.length ? parent[0] : null
        }
        const perspectivesWithPath = perspectives.map(perspective => {
            let path = perspective.name
            let parent = getParent(perspectives, perspective.parentId)

            while (parent) {
                path = `${parent.name} > ${path}`
                parent = getParent(perspectives, parent.parentId)
            }

            return { ...perspective, path }
        })

        perspectivesWithPath.sort((a, b) => {
            if (a.path < b.path) return -1
            if (a.path > b.path) return 1
            return 0
        })
        return perspectivesWithPath
    }

    const toTree = (perspectives, tree) => {

        if (!tree) tree = perspectives.filter(c => !c.parentId)

        tree = tree.map(parentNode => {
            const isChild = node => node.parentId == parentNode.id
            parentNode.children = toTree(perspectives, perspectives.filter(isChild))
            return parentNode
        })
        return tree
    }

    const get = (req, res) => {
        app.db('perspectives')
            .then(perspective => res.json(withPath(perspective)))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('perspectives')
            .where({ id: req.params.id })
            .first()
            .then(perspective => res.json(perspective))
            .catch(err => res.status(500).send(err))
    }

    const getTree = (req, res) => {
        app.db('perspectives')
            .then(perspectives => res.json(toTree(withPath(perspectives))))
            .catch(err => res.status(500).send(err))
    }

    const getPerspectiveForMap = (req,res) => {
        app.db('perspectives')
        .select('id','name')
        .whereBetween('id', [1, 5])
        .then(perspective => res.json(perspective))
        .catch(err => res.status(500).send())
    }
    return { save, remove, get, getById, getTree, getPerspectiveForMap }
}