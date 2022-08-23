require('dotenv').config()

const https = require('https')
const { default: mongoose } = require('mongoose')

async function connect(){
    mongoose.Promise = global.Promise
    await mongoose.connect(process.env.DOCKER_URI)
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
}

async function print(args){
    process.stdout.write(args+"\n")
}

const req = https.get('https://api.spaceflightnewsapi.net/v3/articles/count', res => {
    let body = ""
    print("buscando artigos")
    res.on("data", chunck => {
        body = chunck
    })


    res.on("end", () => {
        const count = Number(body.toString('ascii'))
        print(`total de artigos há serem migrados ${count}`)

        const url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=${count}`
        https.get(url, async res => {
            let body = ""
            res.on("data", chunk => {
                body += chunk
            })

            res.on("end", () => {
                data = JSON.parse(body)
                print("criando array de artigos")
            })

            res.on("close", async() => {
                await send()
                print("salvando artigos na base")
                print("artigos salvos")

            })

            res.on("exit", () => {
                process.exit(1)
            })
        })
    })

}).on('error', error => {
    console.error("Error no migração de dados!")
    console.error((error))
})

req.end()







