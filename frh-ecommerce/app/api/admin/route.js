import EcommerceRepo from "@/app/repo/frh-ecommerce-repo.js"

// Return all Artists or Artist by name
export async function GET(request) {
    const admin = await EcommerceRepo.getAdmin()
    return Response.json(admin, { status: 200 })
}
