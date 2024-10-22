import { PrismaClient } from '@prisma/client'
import { Piedra } from 'next/font/google';
const prisma = new PrismaClient()

//Test push
class EcommerceRepo {

    //Category Methods

    //get all Category
    async getCategory(){
        try {
            return prisma.category.findMany()
        } catch (error) {
            return { error: error.message }
        }
    }

    async getCategoryById(id){
        try {
            return prisma.category.findUnique(
                { where: { id }}
            );
        } catch (error) {
            return { error: error.message }
        }
    }

    async addCategory(category){

        try {
            return prisma.artist.create(
                {data:category}
            )
        } catch (error) {
            return { error: error.message }
        }

    }


    async updateCategory(category,id){

        try {
            return prisma.artist.update({
                data: category,
                where: {id}
            }
            )
        } catch (error) {
            return { error: error.message }
        }

    }

    async deleteCategory(id){

        try {
            return prisma.artist.delete(
                { where: {id}}
            )
        } catch (error) {
            return { error: error.message }
        }

    }


    //Artist Methods

    async getArtists(){
        try {
            return prisma.artist.findMany()
        } catch (error) {
            return { error: error.message }
        }
    }

    async getArtist(name){
        try {
            return prisma.artist.findUnique(
                {
                    where: {name}
                }
            )
        } catch (error) {
            return { error: error.message }
        }
    }

    async getArtistId(id){
        try {
            return prisma.artist.findUnique(
                {
                    where: {id}
                    // include:{itemsOnSale: true}
                }
            )
        } catch (error) {
            return { error: error.message }
        }
    }

    async addArtist(artist){

        try {
            return prisma.artist.create(
                {data:artist}
            )
        } catch (error) {
            return { error: error.message }
        }

    }

    async updateArtist(artist,id){

        try {
            return prisma.artist.update({
                data: artist,
                where: {id}
        })
        } catch (error) {
            return { error: error.message }
        }

    }


    async deleteArtist(id){

        try {
            return prisma.artist.delete(
                {where:{id}}
            )
        } catch (error) {
            return { error: error.message }
        }

    }

    async addItemToSale(id,itemsOnSale) {

    //     try {
    //         const artist = prisma.artist.findUnique({
    // where: {
    //     id:id,
    // },
    // });

    // if (!artist) {
    //     throw new Error('Artist not found');
    
    // }

    // const updateItem = prisma.artist.update(
    //     {where:id},
    //     {data:}
    // )

    //     } 
    try{
        const item = await this.getItemById(id)
        return prisma.artist.update(
            {where:id},
            //should pass an item -> create addItem methode and add the item to item list , use it here
            // {data:itemsOnSale}

        );
    }
    catch (error) {
            return { error: error.message }
        }

    }



    // Customer 

    async getCustomers(){
        try {
            return prisma.customer.findMany()
        } catch (error) {
            return { error: error.message }
        }
    }


    async getCustomerById(id){
        try {
            return prisma.customer.findUnique({
                where: { id }
            });
        } catch (error) {
            return { error: error.message }
        }
    }


    async getCustomerByName(name){
        try {
            return prisma.customer.findFirst({
                where: { name }
            });
        } catch (error) {
            return { error: error.message }
        }
    }

    async getCustomerByUsername(username){
        try {
            return prisma.customer.findMany({
                where: { username: username }
            });
        } catch (error) {
            return { error: error.message }
        }
    }

    async addCustomer(customer){

        try {
            return prisma.customer.create(
                {data: customer}
            )
        } catch (error) {
            return { error: error.message }
        }

    }


    async updateCustomer(customer,id){

        try {
            return prisma.customer.update({
                data: customer,
                where: {id}
        })
        } catch (error) {
            return { error: error.message }
        }

    }


    async deleteCustomer(id){

        try {
            return prisma.customer.delete(
                { where: {id}}
            )
        } catch (error) {
            return { error: error.message }
        }

    }


    //Item

    async getItems(){

        try {
            return prisma.item.findMany({
                include: {Artist: true, Category: true}
            });
        } catch (error) {
            return { error: error.message }
        }

    }

    async getItemById(id){

        try {
            return prisma.item.findUnique(
                {
                    where: { id },
                    include: {Artist: true, Category: true}
                }
            );
        } catch (error) {
            return { error: error.message }
        }

    }

    

    async getItemByTitle(title){

        try {
            return await prisma.item.findFirst({
                where: {
            title: title
                },
                include: {Artist: true, Category: true}
            });
        } catch (error) {
            return { error: error.message }
        }

    }

    async getItemByPrice(price){

        try {
            return await prisma.item.findMany({
                where: {
                price: parseInt(price),
                }
            });
        } catch (error) {
            return { error: error.message }
        }

    }

    async getItemByDescription(description){

        try {
            return await prisma.item.findMany({
                where: {description : {contains : description}},
                include: {Artist: true, Category: true}
            });
        } catch (error) {
            return { error: error.message }
        }

    }

    async getItemByCategory(id){

        try {
            return await prisma.item.findMany({
                where: {categoryId: parseInt(id)}
            });
        } catch (error) {
            return { error: error.message }
        }

    }

    async getItemByArtist(id){

        try {
            return await prisma.item.findMany({
                where: {artistID: parseInt(id)}
            });
        } catch (error) {
            return { error: error.message }
        }

    }

    async addItem(item){

        try {
            return await prisma.item.create({
                data:item
            })
        } catch (error) {
            return { error: error.message }
        }

    }


    async updateItem(item, id){

        try {
            return await prisma.item.update({
                data: item,
                where: {id}
            });
        } catch (error) {
            return { error: error.message }
        }

    }


    async deleteItem(id){
        try {
            return await prisma.item.delete({
                where: {
                id
                },
            });
        } catch (error) {
            return { error: error.message }
        }

    }


    //Transactions

    async getTransactions() {
        try {
            return prisma.transaction.findMany();
            
        } catch (error) {
            return { error: error.message }
        }
    }

    //for one id it has many transactions
    async getTransaction(id) {
        try {
            return prisma.transaction.findMany(
                { where: { id } }
            )
        } catch (error) {
            return { error: error.message }
        }
    }

    async getUserTransactions(userId){
        try{
            return prisma.transaction.findMany({where: {userId}})
        }catch(error){
            return {error: error.message}
        }
    }

    async getArtistTransactions(artistId) {
        try {
            const transactions = await prisma.transaction.findMany({
                where: {
                    artwork: {
                        artistID: parseInt(artistId)
                    }
                },
                include: {
                    artwork: true,
                    customer: true
                }
            });
            return transactions;
        } catch (error) {
            return { error: error.message };
        }
    }
    
    async addTransaction(customerId, transaction) {
            console.log("INSIDE ASS TRANSACTION");
            const customer = await this.getCustomerById(customerId)
            const item = await this.getItemById(transaction.itemId)

            console.log(customer.balance);
            try {
            if (transaction.totalPrice <= customer.balance) {
                customer.balance -= (transaction.totalPrice);
                item.available_quantity-=transaction.quantity;
                item.quantity_to_buy = 0
            }
            else {
                return { error: "Insufficient Balance" };
            }

            await this.updateCustomer(customer, customerId)
            await this.updateItem(item, item.id)
    
            return prisma.transaction.create({ data: transaction })
        } catch (error) {
            return { error: error.message };
        }
}
    


    async updateTransaction(id,transaction){

        try {
            return await prisma.transaction.update({
                data: transaction,
                where: {id}
        })
        } catch (error) {
            return { error: error.message }
        }
        
    }


    async deleteTransaction(id){

        try {
            return await prisma.transaction.delete({
                where: {id}
            });
        } catch (error) {
            return { error: error.message }
        }
        
    }

    // total quantities bought of this item for each customer.
    async totalPUrchasesPerProduct(){
        try {

            const costumer_purchases_grouped = prisma.transaction.groupBy({
                by: ["userId", "itemId"],
                aggregate: {
                    _sum: {quantity: true}
                }
            })

            return costumer_purchases_grouped;
            
        } catch (error) {
            return { error: error.message }
        }
    }

    
    // async  totalPurchaseForYear(year) {
    //     try {
    //         const transactionsForYear = await prisma.transaction.findMany({
    //             where: {
    //                 AND: [
    //                     { date: { gte: new Date(Date.UTC(year, 0, 1)) } }, // Start of the year
    //                     { date: { lt: new Date(Date.UTC(year + 1, 0, 1)) } } // Start of the next year
    //                 ]
    //             }
    //         });
    
    //         // Calculate total purchase
    //         let totalPurchase = 0;
    //         transactionsForYear.forEach(transaction => {
    //             totalPurchase += transaction.totalPrice;
    //         });
    
    //         return totalPurchase;
    //     } catch (error) {
    //         return { error: error.message };
    //     }
    // }
    

    async  totalPurchasePerUser() {
        try {
            const usersWithTotalPurchase = await prisma.customer.findMany({
                include: {
                    transactions: {
                        select: {
                            quantity: true
                        }
                    }
                }
            });
    
            const result = usersWithTotalPurchase.map(user => {
                const totalPurchase = user.transactions.reduce((total, transaction) => {
                    return total + transaction.quantity;
                }, 0);
    
                return {
                    userId: user.id,
                    totalPurchase: totalPurchase
                };
            });
    
            return result;
        } catch (error) {
            return { error: error.message };
        }
    }
    
    
    
    
    

    // count number of purchases done in each location
    async  totalPurchasesPerCity() {
        try {
            const locationPurchases = await prisma.transaction.groupBy({
                by: ['location'],
                _count: true
            });
    
            return locationPurchases;
        } catch (error) {
            return { error: error.message };
        }
    }
    

    // The most 3 products bought over the last 6 months
    // async top3Items() {
    //     try {
    //         const top_three = await prisma.transaction.groupBy({
    //             by: ["itemId"],
    //             where: {
    //                 date: {
    //                     gte: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000)
    //                 }
    //             },
    //             aggregate: {
    //                 _sum: { quantity: true }
    //             },
    //             orderBy: {
    //                 _sum: {
    //                     quantity: "desc"
    //                 }
    //             },
    //             take: 3
    //         });
    
    //         return top_three;
    
    //     } catch (error) {
    //         return { error: error.message };
    //     }
    // }

    async getTop3Items() {
        try {
            const topThreeItems = await prisma.transaction.groupBy({
                by: ["itemId"],
                where: {
                    date: {
                        gte: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000)
                    }
                },
                _sum: {
                    quantity: true
                },
                orderBy: {
                    _sum: {
                        quantity: "desc"
                    }
                },
                take: 3
            });
    
            // Extract item IDs from the result
            const itemIds = topThreeItems.map(item => item.itemId);
    
            // Retrieve details of the top 3 items
            const topItems = await prisma.item.findMany({
                where: {
                    id: {
                        in: itemIds
                    }
                }
            });
    
            return topItems;
        } catch (error) {
            console.error("Error retrieving top 3 items:", error);
            return { error: error.message };
        }
    }
    
    
    

    async  totalPurchasePerCategory() {
        try {
            const categoriesWithTotalPurchase = await prisma.category.findMany({
                include: {
                    items: {
                        select: {
                            Transaction: {
                                select: {
                                    quantity: true
                                }
                            }
                        }
                    }
                }
            });
    
            const result = categoriesWithTotalPurchase.map(category => {
                const totalPurchase = category.items.reduce((total, item) => {
                    if (item.Transaction) {
                        total += item.Transaction.reduce((sum, transaction) => {
                            return sum + transaction.quantity;
                        }, 0);
                    }
                    return total;
                }, 0);
    
                return {
                    category: category.name,
                    totalPurchase: totalPurchase
                };
            });
    
            return result;
        } catch (error) {
            return { error: error.message };
        }
    }
    
    
    

//     async top3Artists() {
//         try {
//             const topThreeArtists = await prisma.transaction.groupBy({
//                 by: ["userId"],
//                 where: {
//                     date: {
//                         gte: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000)
//                     }
//                 },
//                 aggregate: {
//                     _sum: { quantity: true }
//                 },
//                 orderBy: {
//                     _sum: {
//                         quantity: "desc"
//                     }
//                 },
//                 take: 3
//             });
    
//             // Extract artistIds from topThreeArtists
//             const artistIds = topThreeArtists.map(artist => artist.artistID);
    
//             // Fetch top 3 artists from the database
//             const topArtists = await prisma.artist.findMany({
//                 where: {
//                     id: { in: artistIds }
//                 },
//                 take: 3
//             });
    
//             return topArtists;
//         } catch (error) {
//             return { error: error.message };
//         }
//     }
    


    
// }

async top3Artists() {
    try {
        // Ensure the correct date calculation for the last six months
        const sixMonthsAgo = new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000);
        console.log(`Querying transactions from: ${sixMonthsAgo}`);

        const topThreeArtists = await prisma.transaction.groupBy({
            by: ["userId"],
            where: {
                date: {
                    gte: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000)
                }
            },
            _sum: {
                quantity: true
            },
            orderBy: {
                _sum: {
                    quantity: "desc"
                }
            },
            take: 3
        });            

        console.log(`Top three artist transaction records: ${JSON.stringify(topThreeArtists)}`);

        // Assuming that the artist ID field is correctly named 'userId' in the grouped result
        const artistIds = topThreeArtists.map(artist => artist.userId);

        console.log(`Artist IDs: ${artistIds}`);

        const topArtists = await prisma.artist.findMany({
            where: {
                id: { in: artistIds }
            },
            take: 3
        });

        // console.log(`Top artists found: ${JSON.stringify(topArtists)}`);
        return topArtists;
        
    } catch (error) {
        console.error("Error in top3Artists:", error);
        return { error: error.message };
    }
} 
async  top3Categories() {
    try {
        const categoriesWithTotalPurchase = await prisma.category.findMany({
            include: {
                items: {
                    select: {
                        Transaction: {
                            select: {
                                quantity: true
                            }
                        }
                    }
                }
            }
        });

        const categoriesWithTotalPurchaseSorted = categoriesWithTotalPurchase.map(category => {
            const totalPurchase = category.items.reduce((total, item) => {
                if (item.Transaction) {
                    total += item.Transaction.reduce((sum, transaction) => {
                        return sum + transaction.quantity;
                    }, 0);
                }
                return total;
            }, 0);

            return {
                category: category.name,
                totalPurchase: totalPurchase
            };
        }).sort((a, b) => b.totalPurchase - a.totalPurchase);

        const topThree = categoriesWithTotalPurchaseSorted.slice(0, 3);

        return topThree;
    } catch (error) {
        return { error: error.message };
    }
}

    //Admin

    async getAdmin(){
        try {
            return prisma.admin.findFirst();
        } catch (error) {
            return { error: error.message }
        }
    }

    async updateAdmin(admin, id){
        try{
            return prisma.admin.update({
                data: admin,
                where: {id}
        })
        }catch(error){
            return {error: error.message}
        }
    }

}

export default new EcommerceRepo()