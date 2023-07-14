import { Customer, Address } from "../models";
import { AppError, APIError, BadRequestError, STATUS_CODES } from "../../utils/app_errors";


//Dealing with data base operations
export default class CustomerRepository {
    public async createCustomer(email: string, password: string | number, phone: number) {
        try {
            const createUser = await Customer.create({
                email,
                password,
                phone,
                address: [],
                cart: [],
                wishlist: [],
                order: []
              })
              const customerResult = await createUser.save()
              return customerResult;

        } catch (err) {
            console.log(err)
            throw new APIError(
                "API error",
                STATUS_CODES.INTERNAL_ERROR,
                "Unable to create customer",
                false,
                "Check your connections",
                "Retry"
            )
        }  
    }
    public async CreateAddress( _id: any, street: string, postalCode: string, city: string, country: string ) {
        try {
          const profile = await Customer.findById(_id);
    
          if (profile) {
            const newAddress = new Address({
              street,
              postalCode,
              city,
              country,
            });
    
            await newAddress.save();
    
            profile.address.push(newAddress);
          }
    
        //   return await profile.save();
        } catch (err) {
          
        }
      }

      public async GetCustomers() {
        const allCustomers = await Customer.find({})
        if(!allCustomers) throw Error('Error fetching customers')
        return allCustomers;
      }
    
}  