import EcommerceRepo from "@/app/repo/frh-ecommerce-repo.js"

// Return all customers or curomer by name or cutomer by username
export async function GET(request) {
    const { searchParams } = new URL(request.url)

    let filterType = [...searchParams.keys()][0]
    let value = searchParams.get(filterType)
    let response;

    try{
        switch(filterType){
            case 'username' :
                response = await EcommerceRepo.getCustomerByUsername(value)
                break;
            case 'name' : 
                response = await EcommerceRepo.getCustomerByName(value)
                break;
            default:
                response = await EcommerceRepo.getCustomers();
        }
        return Response.json(response, { status: 200 });
    } catch (error) {
        return Response.json(handleError(error), { status: 500 });
    }
}


// Create new Customer
export async function POST(request) {
    const customer = await request.json()
    const newCustomer = await EcommerceRepo.addCustomer(customer)
    return Response.json(newCustomer, { status: 200 })
}
