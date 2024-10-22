import EcommerceRepo from "@/app/repo/frh-ecommerce-repo.js"


// GET specific customer
export async function GET(request, {params}) {
    const customerID = parseInt(params.id)
    const message = await EcommerceRepo.getCustomerById(customerID)
    return Response.json( message , { status: 200 })
}

// Update customer
export async function PUT(request, { params }) {
    const customerID = parseInt(params.id)
    const customerUpdate = await request.json()
    const updatedCustomer = await EcommerceRepo.updateCustomer(customerUpdate, customerID)
    return Response.json(updatedCustomer, { status: 200 })
}

// DELETE customer by id
export async function DELETE(request, { params }) {
    const customerID = parseInt(params.id)
    const message = await EcommerceRepo.deleteCustomer(customerID)
    return Response.json({ message }, { status: 200 })
}
