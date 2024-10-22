import EcommerceRepo from "@/app/repo/frh-ecommerce-repo.js"

export async function GET(request) {
    const artists = await EcommerceRepo.top3Artists()
    return Response.json(artists, { status: 200 })
}
