import EcommerceRepo from "@/app/repo/frh-ecommerce-repo.js"


// GET specific transaction
export async function GET(request, {params}) {
    const transID = parseInt(params.id)
    const message = await EcommerceRepo.getTransaction(transID)
    return Response.json({ message }, { status: 200 })
}

// Update transaction 
export async function PUT(request, { params }) {
    const transID = parseInt(params.id)
    const transUpdate = await request.json()
    const updatedTrans = await EcommerceRepo.updateTransaction(transID, transUpdate)
    return Response.json(updatedTrans, { status: 200 })
}

// DELETE transaction by id
export async function DELETE(request, { params }) {
    const transID = parseInt(params.id)
    const message = await EcommerceRepo.deleteTransaction(transID)
    return Response.json({ message }, { status: 200 })
}