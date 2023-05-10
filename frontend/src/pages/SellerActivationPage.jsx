import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { server } from "../server";

const SellerActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/shop/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setError(true);
          });
      };
      sendRequest();
    }
  }, []);

  return (
    <>


    <div class="container d-flex justify-content-center">
    <div class="card shaodw-lg  card-1 w-[1000px] mt-[200px]">
        <div class="card-header pt-3 pb-0 ml-auto border-0 ">
         </div>
        <div class="card-body  d-flex pt-0">
            <div class="row no-gutters  mx-auto justify-content-start flex-sm-row flex-column">
                <div class="col-md-4  text-center"><img class="irc_mi img-fluid mr-0" src="https://cdn4.iconfinder.com/data/icons/logistics-delivery-2-5/64/137-512.png"  width="150" height="150"/></div>
                <div class="col-md-6 ">
                    <div class="card border-0 ">
                        <div class="card-body">
                            <h5 class="card-title "><b>{error ? (
                                <p>Your token is expired!</p>
                              ) : (
                                <p>Your account has been created suceessfully!</p>
                              )}</b></h5>
                            <p class="card-text "><p>{error ? (
                                <p>Please Sigup Again!</p>
                              ) : (
                                <p>Please Login to Continue</p>
                              )}</p></p>
                            <Link style={{textDecoration: 'none'}} to={error ? "/shop-create" : "/shop-login"} type="button" class="button"> {error ? "Signup" : "Login"} </Link>
                        </div>
                    </div>
                </div>
           </div>
        </div> 
    </div>
</div>

    </>
  );
};

export default SellerActivationPage;
