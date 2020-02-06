const schedule = require('node-schedule')

module.exports = app => {
    
    schedule.scheduleJob('*/1 * * * *', async function () {
        const usersCount = await app.db('users').count('id').first()
        const perspectivesCount = await app.db('perspectives').count('id').first()
        const objectivesCount = await app.db('objectives').count('id').first()
       


        const { Stat } = app.api.stats

        const lastStat = await Stat.findOne({}, {}, { sort: { 'createdAt': -1 } })

        const stat = new Stat({
            users: usersCount.count,
            perspectives: perspectivesCount.count,
            objectives: objectivesCount.count,
           
            createdAt: new Date()
        })

        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changePerspectives = !lastStat || stat.perspectives !== lastStat.perspectives
        const changeObjectives = !lastStat || stat.objectives !== lastStat.objectives
      
        
        

        if (changeObjectives || changePerspectives || changeUsers) {
            stat.save().then(() => console.log('[Stats] Estatísticas atualizadas com sucesso!'))
        }
    })



    //--------------------------------------------

   
}