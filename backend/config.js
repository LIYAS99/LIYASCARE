/*
=========================================================
LIYAS Electronics
Configuration
Production Ready
Version : 1.0.0
=========================================================
*/

"use strict";

/*
=========================================================
SUPABASE CONFIGURATION
Replace these values with your own project details.
=========================================================
*/

const APP_CONFIG = Object.freeze({

    APP_NAME: "LIYAS Electronics",

    APP_VERSION: "1.0.0",

    COMPANY: "LIYAS Electronics",

    TAGLINE: "Designed for India. Built to Last.",

    SUPABASE: {

        URL: "https://qhuygccueklrlmrmsavi.supabase.co",

        ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFodXlnY2N1ZWtscmxtcm1zYXZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU0MjcyNTUsImV4cCI6MjEwMTAwMzI1NX0.168BBeR0BvrjCu-MRu2FTA05oTzXc9aXDrOWJHIejKA"

    },

    WARRANTY: {

        SERIAL_PREFIX: "LY",

        MIN_SERIAL_LENGTH: 8,

        MAX_SERIAL_LENGTH: 30

    },

    QR: {

        ENABLED: true

    },

    SECURITY: {

        DUPLICATE_SERIAL_CHECK: true,

        REQUIRE_DEALER_LOGIN: true

    }

});


/*
=========================================================
Freeze Nested Objects
=========================================================
*/

Object.freeze(APP_CONFIG.SUPABASE);
Object.freeze(APP_CONFIG.WARRANTY);
Object.freeze(APP_CONFIG.QR);
Object.freeze(APP_CONFIG.SECURITY);


/*
=========================================================
Global Read Only Access
=========================================================
*/

window.APP_CONFIG = APP_CONFIG;
