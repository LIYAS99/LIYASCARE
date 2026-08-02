/*
=========================================================
LIYAS Electronics
LIYAS Care Database

Production Database
Supabase PostgreSQL

Version: 1.0

Tables:
- products
- dealers
- warranties
- admins
- support_tickets
- service_history
- warranty_events

=========================================================
*/


/*
=========================================================
EXTENSIONS
=========================================================
*/

create extension if not exists "uuid-ossp";


/*
=========================================================
PRODUCTS TABLE
=========================================================
*/

create table if not exists products (

    id uuid primary key default uuid_generate_v4(),

    product_code varchar(50) unique not null,

    product_name varchar(150) not null,

    category varchar(100),

    model_number varchar(100),

    warranty_months integer default 12,

    description text,

    image_url text,

    status varchar(20)
    default 'ACTIVE',

    created_at timestamp
    default now()

);



/*
=========================================================
DEALERS TABLE
=========================================================
*/

create table if not exists dealers (

    id uuid primary key default uuid_generate_v4(),

    user_id uuid unique,

    dealer_code varchar(50)
    unique not null,

    dealer_name varchar(150)
    not null,

    owner_name varchar(100),

    mobile varchar(15),

    email varchar(150),

    address text,

    city varchar(100),

    state varchar(100),

    pincode varchar(10),

    gst_number varchar(20),

    status varchar(20)
    default 'ACTIVE',

    created_at timestamp
    default now()

);



/*
=========================================================
WARRANTIES TABLE
=========================================================
*/

create table if not exists warranties (

    id uuid primary key default uuid_generate_v4(),

    customer_name varchar(150)
    not null,

    mobile varchar(15)
    not null,

    email varchar(150),

    serial_number varchar(50)
    unique not null,

    product_code varchar(50),

    product_name varchar(150),

    dealer_id uuid,

    dealer_name varchar(150),

    invoice_number varchar(100),

    purchase_date date,

    warranty_months integer
    default 12,

    status varchar(30)
    default 'ACTIVE',

    registration_date timestamp
    default now(),

    created_at timestamp
    default now()

);



/*
=========================================================
ADMINS TABLE
=========================================================
*/

create table if not exists admins (

    id uuid primary key default uuid_generate_v4(),

    user_id uuid unique,

    name varchar(100),

    email varchar(150)
    unique,

    role varchar(50)
    default 'ADMIN',

    status varchar(20)
    default 'ACTIVE',

    created_at timestamp
    default now()

);



/*
=========================================================
SUPPORT TICKETS
=========================================================
*/

create table if not exists support_tickets (

    id uuid primary key default uuid_generate_v4(),

    ticket_number varchar(50)
    unique not null,

    customer_name varchar(150),

    mobile varchar(15),

    serial_number varchar(50),

    issue text,

    priority varchar(20)
    default 'NORMAL',

    status varchar(30)
    default 'OPEN',

    created_at timestamp
    default now(),

    updated_at timestamp
    default now()

);



/*
=========================================================
PART 1 END
=========================================================
*/

/*
=========================================================
LIYAS Electronics
LIYAS Care Database

FINAL SUPABASE SQL
PART 2

Includes:
- Relationships
- Indexes
- Security (RLS)
- Policies

=========================================================
*/


/*
=========================================================
FOREIGN KEY RELATIONSHIPS
=========================================================
*/


alter table warranties

drop constraint if exists fk_warranty_dealer;



alter table warranties

add constraint fk_warranty_dealer

foreign key (dealer_id)

references dealers(id)

on delete set null;



/*
=========================================================
SERVICE HISTORY TABLE
=========================================================
*/

create table if not exists service_history (

    id uuid primary key default uuid_generate_v4(),

    warranty_id uuid,

    serial_number varchar(50),

    complaint text,

    technician_name varchar(100),

    service_note text,

    status varchar(30)
    default 'PENDING',

    service_date timestamp
    default now()

);



/*
=========================================================
WARRANTY EVENT LOG

Tracks all activities

=========================================================
*/

create table if not exists warranty_events (

    id uuid primary key default uuid_generate_v4(),

    warranty_id uuid,

    serial_number varchar(50),

    event_type varchar(50),

    event_message text,

    created_by varchar(100),

    created_at timestamp
    default now()

);



/*
=========================================================
INDEXES

Fast Search
=========================================================
*/


create index if not exists idx_serial_number

on warranties(serial_number);



create index if not exists idx_customer_mobile

on warranties(mobile);



create index if not exists idx_product_code

on products(product_code);



create index if not exists idx_dealer_code

on dealers(dealer_code);



create index if not exists idx_ticket_number

on support_tickets(ticket_number);



/*
=========================================================
ENABLE ROW LEVEL SECURITY
=========================================================
*/


alter table products enable row level security;

alter table warranties enable row level security;

alter table dealers enable row level security;

alter table admins enable row level security;

alter table support_tickets enable row level security;

alter table service_history enable row level security;

alter table warranty_events enable row level security;



/*
=========================================================
REMOVE OLD POLICIES

Safe Re-run Support

=========================================================
*/


drop policy if exists 
"Public view products"
on products;



drop policy if exists
"Public warranty search"
on warranties;



drop policy if exists
"Dealer own warranty"
on warranties;



drop policy if exists
"Dealer profile"
on dealers;



drop policy if exists
"Admin full access warranty"
on warranties;



/*
=========================================================
PRODUCT POLICY

Website product page

=========================================================
*/


create policy

"Public view products"

on products

for select

using

(
    status='ACTIVE'
);



/*
=========================================================
WARRANTY CHECK POLICY

Public serial verification

NOTE:
Later we will create a secure RPC
for hiding customer data.

=========================================================
*/


create policy

"Public warranty search"

on warranties

for select

using

(
    true
);



/*
=========================================================
DEALER PROFILE POLICY
=========================================================
*/


create policy

"Dealer profile"

on dealers

for select

using

(

    auth.uid() = user_id

);



/*
=========================================================
DEALER WARRANTY POLICY
=========================================================
*/


create policy

"Dealer own warranty"

on warranties

for select

using

(

dealer_id in

(

select id

from dealers

where user_id = auth.uid()

)

);



/*
=========================================================
PART 2 END
=========================================================
*/

/*
=========================================================
LIYAS Electronics
LIYAS Care Database

FINAL SUPABASE SQL
PART 3

Includes:
- Admin Access
- Insert Security
- Warranty Registration Permission
- Sample Products
- Update Trigger
- Final Setup

=========================================================
*/


/*
=========================================================
ADMIN ACCESS POLICIES
=========================================================
*/


drop policy if exists

"Admin full access warranty"

on warranties;



create policy

"Admin full access warranty"

on warranties

for all

using

(

exists

(

select 1

from admins

where admins.user_id = auth.uid()

)

);



drop policy if exists

"Admin full access products"

on products;



create policy

"Admin full access products"

on products

for all

using

(

exists

(

select 1

from admins

where admins.user_id = auth.uid()

)

);



drop policy if exists

"Admin full access dealers"

on dealers;



create policy

"Admin full access dealers"

on dealers

for all

using

(

exists

(

select 1

from admins

where admins.user_id = auth.uid()

)

);



/*
=========================================================
WARRANTY REGISTRATION INSERT

Website warranty form ke liye

=========================================================
*/


drop policy if exists

"Public warranty registration"

on warranties;



create policy

"Public warranty registration"

on warranties

for insert

with check

(

true

);



/*
=========================================================
SUPPORT TICKET POLICIES
=========================================================
*/


drop policy if exists

"Public create ticket"

on support_tickets;



create policy

"Public create ticket"

on support_tickets

for insert

with check

(

true

);



drop policy if exists

"Admin support access"

on support_tickets;



create policy

"Admin support access"

on support_tickets

for all

using

(

exists

(

select 1

from admins

where admins.user_id = auth.uid()

)

);



/*
=========================================================
AUTO UPDATE TIMESTAMP FUNCTION
=========================================================
*/


create or replace function update_updated_at()

returns trigger

language plpgsql

as $$

begin

new.updated_at = now();

return new;

end;

$$;



drop trigger if exists

support_ticket_update_time

on support_tickets;



create trigger

support_ticket_update_time

before update

on support_tickets

for each row

execute procedure update_updated_at();



/*
=========================================================
LIYAS INITIAL PRODUCTS

Demo nahi, actual catalog structure

=========================================================
*/


insert into products

(
product_code,
product_name,
category,
model_number,
warranty_months,
description
)

values


(
'LY-TV32-S01',
'LIYAS 32 Inch Smart LED TV',
'LED TV',
'LY32S01',
12,
'Premium Smart LED Television designed for Indian homes.'
),


(
'LY-LB09-B01',
'LIYAS 9W LED Bulb',
'LED Lighting',
'LYLB09',
24,
'Energy efficient LED bulb with long life performance.'
),


(
'LY-STB-MPEG01',
'LIYAS Digital Set Top Box',
'Set Top Box',
'LYSTB01',
12,
'Reliable digital entertainment solution.'
)


on conflict(product_code)

do nothing;



/*
=========================================================
DATABASE VERSION

=========================================================
*/


create table if not exists system_settings

(

id uuid primary key default uuid_generate_v4(),

setting_key varchar(100) unique,

setting_value text,

created_at timestamp default now()

);



insert into system_settings

(
setting_key,
setting_value
)

values

(
'database_version',
'1.0'
)

on conflict(setting_key)

do update

set setting_value='1.0';



/*
=========================================================
LIYAS CARE DATABASE READY

=========================================================
*/
