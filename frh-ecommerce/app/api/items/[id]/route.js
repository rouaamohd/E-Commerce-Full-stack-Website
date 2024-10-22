import EcommerceRepo from "@/app/repo/frh-ecommerce-repo.js"


// GET specific item
export async function GET(request, {params}) {
    console.log("inside get");
    const itemID = parseInt(params.id)
    const message = await EcommerceRepo.getItemById(itemID)
    return Response.json(message, { status: 200 })
}

// Update item
export async function PUT(request, { params }) {
    const itemID = parseInt(params.id)
    const itemUpdate = await request.json()
    const updatedItem = await EcommerceRepo.updateItem(itemUpdate, itemID)
    return Response.json(updatedItem, { status: 200 })
}

// DELETE customer by id
export async function DELETE(request, { params }) {
    const itemID = parseInt(params.id)
    const message = await EcommerceRepo.deleteItem(itemID)
    return Response.json({ message }, { status: 200 })
}
