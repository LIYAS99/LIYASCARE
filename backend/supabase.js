"use strict";

/*
=========================================
LIYAS SUPABASE CONNECTOR
=========================================
*/

if (!window.supabase) {
    console.error("Supabase Library Not Loaded");
}

const db = window.supabase.createClient(
    APP_CONFIG.SUPABASE.URL,
    APP_CONFIG.SUPABASE.ANON_KEY
);

window.db = db;

console.log("✅ LIYAS Connected To Supabase");


/*
=========================================
DEALER LOGIN
=========================================
*/

async function dealerLogin(dealerCode, password) {

    const { data, error } = await db
        .from("dealers")
        .select("*")
        .eq("dealer_code", dealerCode)
        .eq("password", password)
        .eq("status", "ACTIVE")
        .single();

    if (error || !data) {

        return {
            success: false,
            message: "Invalid Dealer Code or Password"
        };

    }

    sessionStorage.setItem(
        "dealer",
        JSON.stringify(data)
    );

    return {
        success: true,
        data
    };

}


/*
=========================================
GET LOGGED DEALER
=========================================
*/

function getDealer() {

    return JSON.parse(
        sessionStorage.getItem("dealer")
    );

}


/*
=========================================
LOGOUT
=========================================
*/

function dealerLogout() {

    sessionStorage.removeItem("dealer");

    location.href = "dealer-login.html";

}


/*
=========================================
CHECK LOGIN
=========================================
*/

function checkDealerLogin() {

    const dealer = getDealer();

    if (!dealer) {

        location.href = "dealer-login.html";

    }

}


/*
=========================================
CHECK DUPLICATE WARRANTY
=========================================
*/

async function checkWarranty(serial) {

    const { data } = await db
        .from("warranty")
        .select("id")
        .eq("serial_number", serial)
        .maybeSingle();

    return data;

}


/*
=========================================
REGISTER WARRANTY
=========================================
*/

async function registerWarranty(form) {

    const dealer = getDealer();

    if (!dealer) {

        return {
            success: false,
            message: "Dealer Not Logged In"
        };

    }

    const duplicate = await checkWarranty(
        form.serial_number
    );

    if (duplicate) {

        return {
            success: false,
            message: "Warranty Already Registered"
        };

    }

    const { data, error } = await db

        .from("warranty")

        .insert({

            serial_number: form.serial_number,

            customer_name: form.customer_name,

            mobile: form.mobile,

            invoice_number: form.invoice_number,

            dealer_code: dealer.dealer_code,

            purchase_date: form.purchase_date

        })

        .select()

        .single();

    if (error) {

        return {
            success: false,
            message: error.message
        };

    }

    return {

        success: true,

        data

    };

}


/*
=========================================
SEARCH WARRANTY
=========================================
*/

async function searchWarranty(serial) {

    const { data, error } = await db

        .from("warranty")

        .select("*")

        .eq("serial_number", serial)

        .maybeSingle();

    if (error) {

        return null;

    }

    return data;

}


/*
=========================================
GLOBAL
=========================================
*/

window.LIYAS = {

    dealerLogin,

    dealerLogout,

    getDealer,

    checkDealerLogin,

    registerWarranty,

    searchWarranty

};
