import EcommerceRepo from "@/app/repo/frh-ecommerce-repo.js"

// Return all Artists or Artist by name
export async function GET(request) {
    const test = await EcommerceRepo.getTop3Items()
    return Response.json(test, { status: 200 })
}
