const https = require('https')
const { default: mongoose } = require('mongoose')

const database = 'db'
const host = 'database'
const uri = `mongodb://${host}:27017/${database}`
console.log(uri)
async function connect(){
    mongoose.Promise = global.Promise
    await mongoose.connect(uri)
}

const ArticleSchema = new mongoose.Schema({
    featured: Boolean,
    title: String,
    url: String,
    imageUrl: String,
    newsSite: String,
    summary: String,
    publishedAt: String,
    launches: [Array],
    events: [Array],
})

const article =  mongoose.model('articles', ArticleSchema)
let data = []

async function send() {
    await connect()
    await article.insertMany(data)
    await mongoose.disconnect()
    await mongoose.connection.close()
    console.log("artigos salvos com sucesso!")
}

const req = https.get('https://api.spaceflightnewsapi.net/v3/articles/count', res => {
    console.log("buscando artigos!")
    let body = ""
    res.on("data", chunck => {
        body = chunck
    })

    res.on("end", () => {
        const count = Number(body.toString('ascii'))
        console.log("total de artigos há serem migrados "+ count)

        const url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=${count}`
        https.get(url, async res => {
            let body = ""
            res.on("data", chunk => {
                body += chunk
            })

            res.on("end", () => {
                data = JSON.parse(body)
                console.log("array de artigos criado com sucesso!")
            })

            res.on("close", async() => {
                console.log("salvando artigos na base!")
                await send()
            })
        })
    })

}).on('error', error => {
    console.error("Error no migração de dados!")
    console.error((error))
})

req.end()







