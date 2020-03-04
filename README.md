# BalancedScorecard - BSC
## Sistema BSC para uso de Instituições de Ensino
<br/>
Sistema web criado para defesa de monografia do curso de Engenharia de Computação. Neste software, é possível aplicar a tecnologia administrativa BSC em qualquer instituição de ensino superior privado.
Para executar, é necessário dois bancos de dados:
<ul>
  <li>PostgreSQL</li>
  <li>MongoDB</li>
</ul>
Executar backend: <blockquote>npm start</blockquote>
Executar frontend: <blockquote>npm run serve</blockquote>
Ao executar, crie um arquivo .env no backend para ser utilizado no Passport e Knex, exemplo do .env:
<br/>

```javascript
module.exports = {
    authSecret: 'blablablablablajOÁDBF´JODfódfnÓ',
    db: {
        host: '127.0.0.1',
        port: 5432,
        database: 'knowledge',
        user: 'postgres',
        password: '123456'
    }
}
````

