module.exports = app => {
    const Stat = app.mongoose.model('Stat', {
        users: Number,
        perspectives: Number,
        objectives: Number,
        createdAt: Date
    })

    const get = (req, res) => {
        Stat.findOne({}, {}, { sort: { 'createdAt' : -1 } })
            .then(stat => {
                const defaultStat = {
                    users: 0,
                    perspectives: 0,
                    objectives: 0,
                }
                res.json(stat || defaultStat)
            })
    }
    
  
    return { Stat, get }
}