import EcommerceRepo from "@/app/repo/frh-ecommerce-repo.js"

// Return all transactions
export async function GET(request) {
    const transactions = await EcommerceRepo.getTransactions()
    return Response.json(transactions, { status: 200 })
}


// // Create new Transaction
// export async function POST(request) {
//     const transaction = await request.json()
//     // const newTransaction = await EcommerceRepo.addTransaction(transaction)
//     return Response.json(newCategory, { status: 200 })
// }
