import EcommerceRepo from "@/app/repo/frh-ecommerce-repo.js"


// GET specific Artist
export async function GET(request, {params}) {
    const artistID = parseInt(params.id)
    const message = await EcommerceRepo.getArtistId(artistID)
    return Response.json({ message }, { status: 200 })
}

// Update Artist
export async function PUT(request, { params }) {
    const artistID = parseInt(params.id)
    const artistUpdate = await request.json()
    const updatedArtist = await EcommerceRepo.updateArtist(artistUpdate, artistID)
    return Response.json(updatedArtist, { status: 200 })
}

// DELETE artist by id
export async function DELETE(request, { params }) {
    const artistID = parseInt(params.id)
    const message = await EcommerceRepo.deleteArtist(artistID)
    return Response.json({ message }, { status: 200 })
}