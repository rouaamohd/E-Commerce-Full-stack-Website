import EcommerceRepo from "@/app/repo/frh-ecommerce-repo.js"

export async function PUT(request, { params }) {
    const adminId = parseInt(params.id)
    const adminUpdate = await request.json()
    const updatedAdmin = await EcommerceRepo.updateAdmin(adminUpdate, adminId)
    return Response.json(updatedAdmin, { status: 200 })
}