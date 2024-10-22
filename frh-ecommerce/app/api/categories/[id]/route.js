import EcommerceRepo from "@/app/repo/frh-ecommerce-repo.js"


// GET specific category
export async function GET(request, {params}) {
    const categoryID = parseInt(params.id)
    const message = await EcommerceRepo.getCategoryById(categoryID)
    return Response.json({ message }, { status: 200 })
}

// Update category 
export async function PUT(request, { params }) {
    const categoryID = parseInt(params.id)
    const categoryUpdate = await request.json()
    const updatedCategory = await EcommerceRepo.updateCategory(categoryUpdate, categoryID)
    return Response.json(updatedCategory, { status: 200 })
}

// DELETE category by id
export async function DELETE(request, { params }) {
    const categoryID = parseInt(params.id)
    const message = await EcommerceRepo.deleteCategory(categoryID)
    return Response.json({ message }, { status: 200 })
}