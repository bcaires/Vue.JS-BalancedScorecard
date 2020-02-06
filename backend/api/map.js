module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res) => {
        //POST E PUT
        const map = {
            id: req.body.id,
            name: req.body.name,
            parentId: req.body.parentId,
            perspectiveId: req.body.perspectiveId
        }

        if (req.params.id) map.id = req.params.id

        try {
            existsOrError(map.name, 'Nome do atributo do mapa não foi informado')
            existsOrError(map.perspectiveId, 'Perspectiva não informada')
            if(map.id && map.parentId){
                const submap = await app.db('map').where({ parentId: map.id })    
                notExistsOrError(submap, 'map possui submapas.') 
            }
        } catch (msg) {
            res.status(400).send(msg)
        }
        if (map.id) {
            if(map.id == map.parentId) map.parentId = null 
            app.db('map')
                .update(map)
                .where({ id: map.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('map')
                .insert(map)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const subMap = await app.db('map').where({ parentId: req.params.id })
            notExistsOrError(subMap, 'Atributo possui atributo pai')

            const rowsDeleted = await app.db('map')
                .where({ id: req.params.id }).del()
            try {
                existsOrError(rowsDeleted, 'Atributo do mapa não foi encontrado.')
            } catch (msg) {
                return res.status(400).send(msg)
            }
            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    const withPath = maps => {
        const getParent = (maps, parentId) => {
            let parent = maps.filter(parent => parent.id === parentId)
            return parent.length ? parent[0] : null
        }
        const mapsWithPath = maps.map(map => {
            let path = map.name
            let parent = getParent(maps, map.parentId)

            while (parent) {
                path = `${parent.name} > ${path}`
                parent = getParent(maps, parent.parentId)
            }

            return { ...map, path }
        })

        mapsWithPath.sort((a, b) => {
            if (a.path < b.path) return -1
            if (a.path > b.path) return 1
            return 0
        })
        return mapsWithPath
    }


    const get = (req, res) => {
        app.db('map')
            .then(map => res.json(withPath(map)))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('map')
            .where({ id: req.params.id })
            .first()
            .then(map => res.json(map))
            .catch(err => res.status(500).send(err))
    }

    const toTree = (maps, tree) => {

        if (!tree) tree = maps.filter(c => !c.parentId)

        // for(let i = 0; i<tree.length; i++){
        //     delete tree[i].perspectiveId
        // }
        tree = tree.map(parentNode => {
            const isChild = node => node.parentId == parentNode.id
            parentNode.children = toTree(maps, maps.filter(isChild))
            return parentNode
        })
        return tree
    }
    
    const getTree1 = (req, res) => {
        app.db('map')
        .select('id', 'name', 'parentId')
        .then(categories => res.json(toTree(withPath(categories))))
        .catch(err => res.status(500).send(err))
    }
    const getTree2 = (req, res) => {
        app.db('map')
        .select('id', 'name', 'parentId')
        .then(categories => res.json(toTree(categories)))
        .catch(err => res.status(500).send(err))
    }
    return { save, remove, get, getById, getTree1, getTree2 }
}