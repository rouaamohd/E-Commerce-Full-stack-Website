import ecommerceRepo from "@/app/repo/frh-ecommerce-repo";


//get books 
export async function GET(request) {
    const { searchParams } = new URL(request.url)

    let filterType = [...searchParams.keys()][0]
    let value = searchParams.get(filterType)
    console.log(`The filter is ${filterType} and the value is ${value}`);

    let response;
    try {
        switch (filterType) {
            case 'name':
                response = await ecommerceRepo.getItemByTitle(value);
                break;
            case 'category':
                    response = await ecommerceRepo.getItemByCategory(value);
                    break;
            case 'artist':
                    response = await ecommerceRepo.getItemByArtist(value);
                    break;
            case 'description':
                        response = await ecommerceRepo.getItemByDescription(value);
                        break;
            case 'price':
                        response = await ecommerceRepo.getItemByPrice(value);
                        break;

            // Add other cases for different filters if needed
            default:
                response = await ecommerceRepo.getItems();
        }
        return Response.json(response, { status: 200 });
    } catch (error) {
        return Response.json(handleError(error), { status: 500 });
    }

}



export async function POST(request) {
    const item = await request.json()
    const newItem = await ecommerceRepo.addItem(item)
    return Response.json(newItem, { status: 201 })
}