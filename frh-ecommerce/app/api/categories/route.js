import EcommerceRepo from "@/app/repo/frh-ecommerce-repo.js"

// Return all categories
export async function GET(request) {
    const categories = await EcommerceRepo.getCategory()
    return Response.json(categories, { status: 200 })
}


// Create new Category
export async function POST(request) {
    const category = await request.json()
    const newCategory = await EcommerceRepo.addCategory(category)
    return Response.json(newCategory, { status: 200 })
}
