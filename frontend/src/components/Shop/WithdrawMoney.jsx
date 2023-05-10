import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersOfShop } from '../../redux/actions/order';
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { withdraw } from "../../redux/actions/seller"
import { toast } from 'react-toastify';

let schema = yup.object().shape({
      amount: yup.number().required("Amount is Required"),
    });

const WithdrawMoney = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { orders } = useSelector((state) => state.order);
    const { seller } = useSelector((state) => state.seller);
    const [deliveredOrder, setDeliveredOrder] = useState(null);

    useEffect(() => {
        dispatch(getAllOrdersOfShop(seller._id));
   
        const orderData = orders && orders.filter((item) => item.status === "Delivered");
        setDeliveredOrder(orderData);
     }, [dispatch]);

     const formik = useFormik({
      //enableReinitialize: true,
      initialValues: {
        amount: "",
      },
      validationSchema: schema,
      onSubmit: (values) => {
            const amt = values.amount;
            const sc = (amt * 0.1).toFixed(2);
            //const bal = (amt - sc).toFixed(2);
            if(amt >= 1000){
                  dispatch(withdraw({amount: amt,service: sc, id: seller._id}));
                  formik.resetForm();
                  dispatch({ type: "resetState" });
                  setTimeout(() => {
                        window.location.reload();
                  }, 2000);
            } else {
                  toast.error("Minimum withdrawal amount is 1000")
            }
          
      },
    });
   
     //const totalEarningWithoutTax = deliveredOrder && deliveredOrder.reduce((acc,item) => acc + item.totalPrice, 0);
     const totalEarningWithoutTax = seller?.wallet;
     const serviceCharge = totalEarningWithoutTax * 0.1;
     const availableBalance = (totalEarningWithoutTax - serviceCharge).toFixed(2);
     const withdrawableBalance = availableBalance - 5000 > 0 ? availableBalance - 5000 : 0;

     
  return (
      <>
            <div className='w-full h-[90vh] p-8'>
                  <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col">
                        <div className='border-2 mb-3 p-[50px] border-[#000000] rounded-xl'>
                              <h5 className='text-[20px] pb-4'>Total Balance: Rs. {totalEarningWithoutTax}</h5>
                              <h5 className='text-[20px] pb-4'>Balance After Service Tax: Rs. {availableBalance}</h5>
                              <h5 className='text-[20px] pb-4'>Minimum Balance: Rs. 5000</h5>
                              <h5 className='text-[20px] pb-4'>Withdrawable Balance: Rs. {withdrawableBalance}</h5>
                        </div>
                              
                              { withdrawableBalance > 0 ?
                              <form action="" onSubmit={formik.handleSubmit}>
                                    <div>
                                          <input
                                                className='form-control'
                                                type="number"
                                                name="amount"
                                                onChange={formik.handleChange("amount")}
                                                onBlur={formik.handleBlur("amount")}
                                                value={formik.values.amount}
                                                label="Enter Amount"
                                                id="amount"
                                          />
                                          <div className="error">
                                                {formik.touched.amount && formik.errors.amount}
                                          </div>
                                          <button type="submit" className={` text-white h-[50px] ml-[40px] mt-3 button !rounded link`}>
                                          Withdraw
                                          </button>
                                    </div>
                                    </form> : ""
                              }
                  </div>
            </div>
    </>
  )
}

export default WithdrawMoney