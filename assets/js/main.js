"use strict";

/*=========================================
LIYAS ELECTRONICS
Main JS
=========================================*/

document.addEventListener("DOMContentLoaded", async () => {

    console.log("=================================");
    console.log("LIYAS Warranty System");
    console.log("Version : " + APP_CONFIG.VERSION);
    console.log("=================================");

    // Check Config
    if (!window.APP_CONFIG) {

        alert("Config file not loaded.");

        return;

    }

    // Check Supabase
    if (!window.db) {

        alert("Supabase not connected.");

        return;

    }

    console.log("✓ Config Loaded");

    console.log("✓ Supabase Client Ready");

    // Connection Test
    try {

        const { error } = await db
            .from("dealers")
            .select("id")
            .limit(1);

        if (error) {

            console.error(error);

            alert("Database Connected but Query Failed");

            return;

        }

        console.log("✓ Database Connected");

        console.log("LIYAS Website Ready");

    }

    catch (err) {

        console.error(err);

        alert("Connection Failed");

    }

});
