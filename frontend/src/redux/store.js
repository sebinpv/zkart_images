import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/event";
import { cartReducer } from "./reducers/cart";
import { wishlistReducer } from "./reducers/wishlist";
import { orderReducer } from "./reducers/order";
import { brandReducer } from "./reducers/brand";
import { categoryReducer } from "./reducers/category";
import { tagsReducer } from "./reducers/tags";
import { blogCategoryReducer } from "./reducers/blogCategory";
import { blogReducer } from "./reducers/blog";
import { enquiryReducer } from "./reducers/enquiry";
import { couponReducer } from "./reducers/coupon";




const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productReducer,
    events: eventReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
    brand: brandReducer,
    category: categoryReducer,
    tags: tagsReducer,
    blogCat: blogCategoryReducer,
    blog: blogReducer,
    enquiry: enquiryReducer,
    coupon: couponReducer,
  },
});

export default Store;
