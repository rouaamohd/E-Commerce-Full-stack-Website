import EcommerceRepo from "@/app/repo/frh-ecommerce-repo.js"

// Return all Artists or Artist by name
export async function GET(request) {
    let artists = []
    const { searchParams } = new URL(request.url)

    const name = searchParams.get('name')

    if (name) {
        artists = await EcommerceRepo.getArtist(name)
    }
    else {
        artists = await EcommerceRepo.getArtists()
    }

    return Response.json(artists, { status: 200 })
}



// Create new Artist
export async function POST(request) {
    const artist = await request.json()
    const newArtist = await EcommerceRepo.addArtist(artist)
    return Response.json(newArtist, { status: 200 })
}
