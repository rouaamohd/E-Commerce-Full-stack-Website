import EcommerceRepo from "@/app/repo/frh-ecommerce-repo.js"


// GET specific Artist
export async function GET(request) {
    const objs = await EcommerceRepo.top3Categories()
    return Response.json({ objs }, { status: 200 })
}
