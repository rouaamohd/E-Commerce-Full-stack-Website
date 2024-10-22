import fs from 'fs-extra'
import path from 'path'


import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

//TEST
const categoriesPath = path.join(process.cwd(), 'app/data/categories.json')
const artistsPath = path.join(process.cwd(), 'app/data/artists.json')
const customersPath = path.join(process.cwd(), 'app/data/customers.json')
const itemsPath = path.join(process.cwd(), 'app/data/items.json')
const transactionsPath = path.join(process.cwd(), 'app/data/transactions.json')
const adminsPath = path.join(process.cwd(), 'app/data/admin.json')

async function main() {
    try {
        // const categories = await fs.readJSON(categoriesPath)
        // const artists = await fs.readJSON(artistsPath)
        // const customers = await fs.readJSON(customersPath)
        // const items = await fs.readJSON(itemsPath)
        // const transactions = await fs.readJSON(transactionsPath)
        const admins = await fs.readJSON(adminsPath)


        // for (const category of categories) await prisma.category.create({ data: category })
        // for (const artist of artists) await prisma.artist.create({ data: artist })
        // for (const customer of customers) await prisma.customer.create({ data: customer })
        // for (const item of items) await prisma.item.create({ data: item })
        // for (const transaction of transactions) await prisma.transaction.create({ data: transaction })
        for (const admin of admins) await prisma.admin.create({ data: admin })
    
    } catch (error) {
        console.log(error);
        return { error: error.message }
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })