import { Customer, Address } from "../models";
import { AppError, APIError, BadRequestError, STATUS_CODES } from "../../utils/app_errors";
import bcrypt from 'bcrypt'


//Dealing with data base operations
export default class CustomerRepository {
    public static async createCustomer(name: string, email: string, password: any, phone: number) {
        try {
          const findEmail = await Customer.findOne({ email});
          if (findEmail) throw Error('This Email already exist')

          const salt = await bcrypt.genSalt()
          const hashedPassword = await bcrypt.hash(password, salt)
            const createUser = await Customer.create({
                name,
                email: email.toLowerCase(),
                password: hashedPassword,
                phone,
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

    public static async loginUser(email:string, password:any) {
      const user = await Customer.findOne({ email }).exec();
      if (!user) throw new Error("User not found");
      //compare hashed and inputed password
      const compare = await bcrypt.compare(password, user.password);
      if (!compare) throw new Error("Invalid email or Password");
      return user;
    }


    public static async CreateAddress(email: string, street: string, postalCode: string, city: string, country: string ) {
        try {
          const profile = await Customer.findOne({email});
          if(!profile) throw Error('Please sign up to create an address')
            const newAddress = await Address.create({
              street,
              postalCode,
              city,
              country,
            });
            const results = await profile.address.push(newAddress);

            if(results) return profile.save()

        } catch (err) {
          console.log(err)
        }
      }

      public static async GetCustomers() {
        const allCustomers = await Customer.find({})
        if(!allCustomers) throw Error('Error fetching customers')
        return allCustomers;
      }

      public static async GetAddess() {
        const allCustomers = await Address.find({})
        if(!allCustomers) throw Error('Error fetching address')
        return allCustomers;
      }

      public static async GetCustomerbyId(id: string) {
        const customer = await Customer.findById(id, { hash: 0 })
        .populate("address")
        .populate("wishlist")
        .populate("orders")
        .populate("cart.product");
        if(!customer) throw Error('Error fetching customer')
        return customer;
      }


      public static async GetShoppingDetails(id: string) {
        const customer = await Customer.findById(id, { hash: 0 })
        .populate("address")
        .populate("wishlist")
        .populate("orders")
        .populate("cart.product");
        if(!customer) throw Error('Error fetching customer')
        return customer;
      }


      public static async GetWishlist(customerId:string) {
        try {
          const profile = await Customer.findById(customerId).populate(
            "wishlist"
          );
          if(!profile) throw new Error("CAN'T find wishlist")
          return profile.wishlist;
        } catch (err) {
          throw new APIError(
            "API Error",
            STATUS_CODES.INTERNAL_ERROR,
            "Unable to Get Wishlist ",
            false,
            "",
            ""
          );
        }
      }

      public static async FindCustomer(email: string) {
        try {
          const existingCustomer = await Customer.findOne({email });
          return existingCustomer;
        } catch (err) {
          throw new APIError(
            "API Error",
            STATUS_CODES.INTERNAL_ERROR,
            "Unable to Find Customer",
            false,
            "",
            ""
          );
        }
      }

      public static async AddOrderToProfile(customerId:string, order: any) {
        try {
          const profile = await Customer.findById(customerId);
          
    
          if (profile) {
            if (profile.orders == undefined) {
              profile.orders = [];
            }
            profile.orders.push(order);
    
            const profileResult = await profile.save();
    
            return profileResult;
          }
    
          throw new Error("Unable to add to order!");
        } catch (err) {
          throw new APIError(
            "API Error",
            STATUS_CODES.INTERNAL_ERROR,
            "Unable to Create Customer",
            false,
            "",
            ""
          );
        }
      }

     public static async AddWishlistItem(customerId: string, product: any) {
        try {
          const profile = await Customer.findById(customerId).populate(
            "wishlist"
          );
    
          if (profile) {
            let wishlist = profile.wishlist;
    
            if (wishlist.length > 0) {
              let isExist = false;
              wishlist.map((item:any) => {
                if (item._id.toString() === product._id.toString()) {
                  const index = wishlist.indexOf(item);
                  wishlist.splice(index, 1);
                  isExist = true;
                }
              });
    
              if (!isExist) {
                wishlist.push(product);
              }
            } else {
              wishlist.push(product);
            }
            profile.wishlist = wishlist;
          } else {
             throw Error('!irreversible reaction')
          }
    
           const profileResult = await profile.save();
    
           return profileResult.wishlist;
        } catch (err) {
          throw new Error('')
        }
      }

      public static async AddCartItem(customerId:any, product:any, qty: number, isRemove:boolean) {
        try {
          const profile = await Customer.findById(customerId).populate(
            "cart.product"
          );
    
          if (profile) {
            const cartItem = {
              product,
              unit: qty,
            };
    
            let cartItems = profile.cart;
    
            if (cartItems.length > 0) {
              let isExist = false;
              cartItems.map((item:any) => {
                if (item.product._id.toString() === product._id.toString()) {
                  if (isRemove) {
                    cartItems.splice(cartItems.indexOf(item), 1);
                  } else {
                    item.unit = qty;
                  }
                  isExist = true;
                }
              });
    
              if (!isExist) {
                cartItems.push(cartItem);
              }
            } else {
              cartItems.push(cartItem);
            }
    
            profile.cart = cartItems;
    
            const cartSaveResult = await profile.save();
    
            return cartSaveResult.cart;
          }
    
          throw new Error("Unable to add to cart!");
        } catch (err) {
          throw new Error('')
        }
      }
    }
    
    
