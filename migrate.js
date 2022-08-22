require('dotenv').config()

const https = require('https')
const { default: mongoose } = require('mongoose')

const uri = process.env.NODE === 'docker' ? process.env.DOCKER_URI : process.env.LOCALHOST_URI
process.stdout.write(uri+"\n")
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
let message
async function send() {
    await connect()
    await article.insertMany(data)
    await mongoose.disconnect()
    await mongoose.connection.close()
}

async function print(args){
    if(args === message){
        console.log(args+"-OK!")
        delete message
        return
    }
    console.log(args)
}

const req = https.get('https://api.spaceflightnewsapi.net/v3/articles/count', res => {
    let body = ""
    message = "buscando artigos"
    print(message)
    res.on("data", chunck => {
        body = chunck
    })


    res.on("end", () => {
        const count = Number(body.toString('ascii'))
        message = `total de artigos há serem migrados ${count}`
        print(message)

        const url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=${count}`
        https.get(url, async res => {
            let body = ""
            res.on("data", chunk => {
                body += chunk
            })

            res.on("end", () => {
                message="criando array de artigos"
                data = JSON.parse(body)
                print(message)
            })

            res.on("close", async() => {
                message = "salvando artigos na base"
                await send()
                print(message)
            })
        })
    })

}).on('error', error => {
    console.error("Error no migração de dados!")
    console.error((error))
})

req.end()







