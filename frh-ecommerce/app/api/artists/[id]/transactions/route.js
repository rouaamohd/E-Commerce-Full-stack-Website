import EcommerceRepo from "@/app/repo/frh-ecommerce-repo.js"

export async function GET(reques, {params}){
    const artistId = parseInt(params.id)
    const artistTransactions = await EcommerceRepo.getArtistTransactions(artistId)
    return Response.json(artistTransactions, {status: 201})
}