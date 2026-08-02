/*
=========================================================
LIYAS Electronics
Supabase Database Connector

File:
backend/supabase.js

Part 1:
- Supabase Initialization
- Connection Handler
- Common Utilities
- Error Management

Compatible:
✔ GitHub Pages
✔ Supabase JS v2
=========================================================
*/

"use strict";


/*
=========================================================
CHECK CONFIGURATION
=========================================================
*/

if(typeof APP_CONFIG === "undefined"){

    console.error(
        "LIYAS Error: config.js not loaded"
    );

}


/*
=========================================================
CREATE SUPABASE CLIENT
=========================================================
*/

let supabaseClient = null;


function initializeSupabase(){

    try{


        if(
            !window.supabase
        ){

            throw new Error(
                "Supabase library missing"
            );

        }


        if(
            !APP_CONFIG.SUPABASE.URL ||
            !APP_CONFIG.SUPABASE.ANON_KEY
        ){

            throw new Error(
                "Supabase configuration missing"
            );

        }


        supabaseClient =
        
        window.supabase.createClient(

            APP_CONFIG.SUPABASE.URL,

            APP_CONFIG.SUPABASE.ANON_KEY

        );


        console.log(

            "LIYAS Supabase Connected"

        );


        return true;


    }

    catch(error){


        console.error(

            "Supabase Connection Error:",
            error.message

        );


        return false;


    }

}



/*
=========================================================
GET DATABASE CLIENT
=========================================================
*/

function getSupabase(){

    if(!supabaseClient){

        initializeSupabase();

    }


    return supabaseClient;

}



/*
=========================================================
DATABASE RESPONSE HANDLER
=========================================================
*/

function handleDatabaseError(error){


    if(!error){

        return null;

    }


    console.error(

        "Database Error:",
        error

    );


    return {


        success:false,


        message:
        error.message ||
        "Something went wrong"


    };


}



/*
=========================================================
SUCCESS RESPONSE FORMAT
=========================================================
*/

function successResponse(
    
    data,
    message="Success"

){

    return {


        success:true,


        data:data,


        message:message


    };


}



/*
=========================================================
FAILED RESPONSE FORMAT
=========================================================
*/

function failedResponse(

    message

){

    return {


        success:false,


        data:null,


        message:message


    };


}



/*
=========================================================
CHECK INTERNET CONNECTION
=========================================================
*/

function checkInternet(){


    return navigator.onLine;


}



/*
=========================================================
FORMAT DATE
=========================================================
*/

function databaseDate(){


    return new Date()

    .toISOString();


}



/*
=========================================================
GENERATE UNIQUE REQUEST ID
=========================================================
*/

function generateRequestID(){


    return (

        "LY-" +

        Date.now() +

        "-" +

        Math.floor(

            Math.random()*9999

        )

    );


}



/*
=========================================================
SANITIZE INPUT
=========================================================
*/

function sanitizeInput(value){


    if(
        typeof value !== "string"
    ){

        return value;

    }


    return value

    .trim()

    .replace(
        /[<>]/g,
        ""
    );


}



/*
=========================================================
INITIALIZE ON LOAD
=========================================================
*/

document.addEventListener(

"DOMContentLoaded",

()=>{


    initializeSupabase();


}

);

/*
=========================================================
LIYAS Electronics
Supabase Database Connector

Part 2:
Warranty Management System

Functions:
- Check Serial
- Register Warranty
- Get Warranty Details
=========================================================
*/


/*
=========================================================
CHECK DUPLICATE SERIAL NUMBER
=========================================================
*/

async function checkSerialExists(serialNumber){


    try{


        const db = getSupabase();


        const {

            data,

            error


        } = await db

        .from("warranties")

        .select(

            "id,serial_number"

        )

        .eq(

            "serial_number",

            serialNumber

        )

        .maybeSingle();



        if(error){


            return handleDatabaseError(error);


        }



        if(data){


            return successResponse(

                true,

                "Serial number already registered"

            );


        }



        return successResponse(

            false,

            "Serial number available"

        );



    }

    catch(error){


        return handleDatabaseError(error);


    }


}





/*
=========================================================
VALIDATE SERIAL FORMAT
=========================================================
*/

function validateSerial(serial){


    if(!serial){

        return false;

    }


    serial = serial.trim();



    if(
        serial.length <
        APP_CONFIG.WARRANTY.MIN_SERIAL_LENGTH
    ){

        return false;

    }



    if(
        serial.length >
        APP_CONFIG.WARRANTY.MAX_SERIAL_LENGTH
    ){

        return false;

    }



    return true;


}





/*
=========================================================
REGISTER WARRANTY
=========================================================
*/

async function registerWarranty(customerData){


    try{


        const db = getSupabase();



        if(!customerData){

            return failedResponse(

                "Customer data missing"

            );

        }



        const serial = sanitizeInput(

            customerData.serial_number

        );



        if(!validateSerial(serial)){


            return failedResponse(

                "Invalid serial number"

            );

        }




        const duplicate =

        await checkSerialExists(serial);



        if(

            duplicate.data === true

        ){

            return failedResponse(

                "Warranty already registered"

            );

        }




        const warrantyData = {


            customer_name:

            sanitizeInput(

                customerData.customer_name

            ),



            mobile:

            sanitizeInput(

                customerData.mobile

            ),



            email:

            sanitizeInput(

                customerData.email || ""

            ),



            serial_number:

            serial,



            product_name:

            sanitizeInput(

                customerData.product_name

            ),



            dealer_name:

            sanitizeInput(

                customerData.dealer_name || ""

            ),



            invoice_number:

            sanitizeInput(

                customerData.invoice_number || ""

            ),



            purchase_date:

            customerData.purchase_date,



            registration_date:

            databaseDate(),



            status:

            "ACTIVE"

        };





        const {

            data,

            error


        } = await db

        .from("warranties")

        .insert(

            warrantyData

        )

        .select()

        .single();





        if(error){


            return handleDatabaseError(error);


        }





        return successResponse(

            data,

            "Warranty registered successfully"

        );





    }

    catch(error){


        return handleDatabaseError(error);


    }



}





/*
=========================================================
GET WARRANTY DETAILS
=========================================================
*/

async function getWarranty(serialNumber){


    try{


        const db = getSupabase();



        const {

            data,

            error


        } = await db

        .from("warranties")

        .select("*")

        .eq(

            "serial_number",

            serialNumber

        )

        .maybeSingle();





        if(error){


            return handleDatabaseError(error);


        }





        if(!data){


            return failedResponse(

                "Warranty not found"

            );


        }





        return successResponse(

            data,

            "Warranty found"

        );





    }

    catch(error){


        return handleDatabaseError(error);


    }


}





/*
=========================================================
UPDATE WARRANTY STATUS
=========================================================
*/

async function updateWarrantyStatus(

serialNumber,

status

){


    try{


        const db = getSupabase();



        const {

            data,

            error

        } = await db

        .from("warranties")

        .update({

            status:status

        })

        .eq(

            "serial_number",

            serialNumber

        )

        .select();





        if(error){


            return handleDatabaseError(error);


        }





        return successResponse(

            data,

            "Warranty status updated"

        );



    }

    catch(error){


        return handleDatabaseError(error);


    }


}

/*
=========================================================
LIYAS Electronics
Supabase Database Connector

Part 3:
Dealer + Admin Ready Functions

Functions:
- Dealer Login
- Dealer Profile
- Dealer Warranty Records
- Customer Search
- Admin Data Helpers
=========================================================
*/


/*
=========================================================
DEALER LOGIN
=========================================================
*/

async function dealerLogin(

email,

password

){

    try{


        const db = getSupabase();


        const {

            data,

            error


        } = await db.auth.signInWithPassword({

            email: email,

            password: password

        });



        if(error){


            return failedResponse(

                error.message

            );


        }



        return successResponse(

            data,

            "Dealer login successful"

        );



    }

    catch(error){


        return handleDatabaseError(error);


    }


}





/*
=========================================================
DEALER LOGOUT
=========================================================
*/

async function dealerLogout(){


    try{


        const db = getSupabase();


        const {

            error

        } = await db.auth.signOut();



        if(error){


            return failedResponse(

                error.message

            );


        }



        return successResponse(

            null,

            "Logout successful"

        );



    }

    catch(error){


        return handleDatabaseError(error);


    }


}





/*
=========================================================
GET CURRENT USER
=========================================================
*/

async function getCurrentUser(){


    try{


        const db=getSupabase();


        const {

            data,

            error

        } = await db.auth.getUser();




        if(error){


            return failedResponse(

                error.message

            );


        }




        return successResponse(

            data.user,

            "User found"

        );



    }

    catch(error){


        return handleDatabaseError(error);


    }


}





/*
=========================================================
GET DEALER PROFILE
=========================================================
*/

async function getDealerProfile(

dealerId

){


    try{


        const db=getSupabase();



        const {

            data,

            error

        } = await db

        .from("dealers")

        .select("*")

        .eq(

            "id",

            dealerId

        )

        .single();





        if(error){


            return handleDatabaseError(error);


        }





        return successResponse(

            data,

            "Dealer profile loaded"

        );



    }

    catch(error){


        return handleDatabaseError(error);


    }


}





/*
=========================================================
GET DEALER WARRANTY LIST
=========================================================
*/

async function getDealerWarranties(

dealerName

){


    try{


        const db=getSupabase();



        const {

            data,

            error

        } = await db

        .from("warranties")

        .select("*")

        .eq(

            "dealer_name",

            dealerName

        )

        .order(

            "registration_date",

            {

                ascending:false

            }

        );





        if(error){


            return handleDatabaseError(error);


        }





        return successResponse(

            data,

            "Dealer warranties loaded"

        );



    }

    catch(error){


        return handleDatabaseError(error);


    }


}





/*
=========================================================
CUSTOMER SEARCH
=========================================================
*/

async function searchCustomer(

mobile

){


    try{


        const db=getSupabase();



        const {

            data,

            error

        } = await db

        .from("warranties")

        .select("*")

        .eq(

            "mobile",

            mobile

        );





        if(error){


            return handleDatabaseError(error);


        }





        return successResponse(

            data,

            "Customer records found"

        );



    }

    catch(error){


        return handleDatabaseError(error);


    }


}





/*
=========================================================
ADMIN GET ALL WARRANTIES
=========================================================
*/

async function adminGetAllWarranties(){


    try{


        const db=getSupabase();



        const {

            data,

            error

        } = await db

        .from("warranties")

        .select("*")

        .order(

            "registration_date",

            {

                ascending:false

            }

        );





        if(error){


            return handleDatabaseError(error);


        }





        return successResponse(

            data,

            "All warranties loaded"

        );



    }

    catch(error){


        return handleDatabaseError(error);


    }


}





/*
=========================================================
EXPORT GLOBAL FUNCTIONS

Available For HTML Pages
=========================================================
*/


window.LIYAS_DB = {


    registerWarranty,

    getWarranty,

    checkSerialExists,

    updateWarrantyStatus,


    dealerLogin,

    dealerLogout,

    getCurrentUser,

    getDealerProfile,

    getDealerWarranties,


    searchCustomer,

    adminGetAllWarranties


};



console.log(

    "LIYAS Database Module Ready"

);
