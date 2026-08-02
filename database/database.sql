/*
=========================================================
LIYAS Electronics
Database Structure

File:
database.sql

Part 1

Tables:
- products
- dealers
- warranties (base)

Database:
Supabase PostgreSQL
=========================================================
*/


/*
=========================================================
UUID EXTENSION
=========================================================
*/

create extension if not exists "uuid-ossp";



/*
=========================================================
PRODUCTS TABLE

Stores LIYAS products
=========================================================
*/

create table if not exists products (

    id uuid primary key default uuid_generate_v4(),

    product_code varchar(50) unique not null,

    product_name varchar(100) not null,

    category varchar(100),

    model_number varchar(100),

    warranty_months integer default 12,

    description text,

    image_url text,

    status varchar(20) default 'ACTIVE',

    created_at timestamp default now()

);



/*
=========================================================
DEALERS TABLE

Authorized Dealer Network
=========================================================
*/

create table if not exists dealers (

    id uuid primary key default uuid_generate_v4(),

    user_id uuid,

    dealer_code varchar(50) unique not null,

    dealer_name varchar(150) not null,

    owner_name varchar(100),

    mobile varchar(15),

    email varchar(150),

    address text,

    city varchar(100),

    state varchar(100),

    pincode varchar(10),

    gst_number varchar(20),

    status varchar(20) default 'ACTIVE',

    created_at timestamp default now()

);



/*
=========================================================
WARRANTY TABLE

Customer Warranty Registration

=========================================================
*/

create table if not exists warranties (

    id uuid primary key default uuid_generate_v4(),


    customer_name varchar(150) not null,


    mobile varchar(15) not null,


    email varchar(150),


    serial_number varchar(50) unique not null,


    product_name varchar(100),


    product_code varchar(50),


    dealer_name varchar(150),


    dealer_id uuid,


    invoice_number varchar(100),


    purchase_date date,


    registration_date timestamp default now(),


    warranty_months integer default 12,


    status varchar(30) default 'ACTIVE',


    created_at timestamp default now()


);



/*
=========================================================
INDEXES

Improve search speed
=========================================================
*/


create index if not exists

idx_warranty_serial

on warranties(serial_number);



create index if not exists

idx_warranty_mobile

on warranties(mobile);



create index if not exists

idx_dealer_code

on dealers(dealer_code);



/*
=========================================================
PART 1 END
=========================================================
*/

/*
=========================================================
LIYAS Electronics
Database Structure

Part 2

Tables:
- admins
- support_tickets
- service_history
- warranty_events

Security:
- RLS Base
=========================================================
*/


/*
=========================================================
ADMINS TABLE

Admin panel users
=========================================================
*/

create table if not exists admins (

    id uuid primary key default uuid_generate_v4(),

    user_id uuid unique,

    name varchar(100) not null,

    email varchar(150) unique,

    role varchar(50) default 'ADMIN',

    status varchar(20) default 'ACTIVE',

    created_at timestamp default now()

);



/*
=========================================================
SUPPORT TICKETS

Customer complaint management
=========================================================
*/

create table if not exists support_tickets (

    id uuid primary key default uuid_generate_v4(),


    ticket_number varchar(50) unique not null,


    customer_name varchar(150),


    mobile varchar(15),


    email varchar(150),


    serial_number varchar(50),


    product_name varchar(100),


    issue text,


    priority varchar(20) default 'NORMAL',


    status varchar(30) default 'OPEN',


    assigned_to uuid,


    created_at timestamp default now(),


    updated_at timestamp default now()

);



/*
=========================================================
SERVICE HISTORY

Stores repair/service records
=========================================================
*/

create table if not exists service_history (

    id uuid primary key default uuid_generate_v4(),


    warranty_id uuid,


    serial_number varchar(50),


    service_type varchar(50),


    complaint text,


    technician_name varchar(100),


    service_note text,


    service_status varchar(30)
    default 'PENDING',


    service_date timestamp default now()

);



/*
=========================================================
WARRANTY EVENTS

Complete warranty activity log

Example:
Registration
Verification
Service
Status Change

=========================================================
*/

create table if not exists warranty_events (

    id uuid primary key default uuid_generate_v4(),


    warranty_id uuid,


    serial_number varchar(50),


    event_type varchar(50),


    event_message text,


    created_by varchar(100),


    created_at timestamp default now()

);



/*
=========================================================
FOREIGN KEY RELATIONSHIPS

=========================================================
*/


alter table warranties

add constraint fk_warranty_dealer

foreign key (dealer_id)

references dealers(id)

on delete set null;



alter table service_history

add constraint fk_service_warranty

foreign key (warranty_id)

references warranties(id)

on delete cascade;



alter table warranty_events

add constraint fk_event_warranty

foreign key (warranty_id)

references warranties(id)

on delete cascade;



/*
=========================================================
ROW LEVEL SECURITY ENABLE

Supabase Security Layer

=========================================================
*/


alter table warranties

enable row level security;



alter table dealers

enable row level security;



alter table products

enable row level security;



alter table support_tickets

enable row level security;



alter table service_history

enable row level security;



alter table warranty_events

enable row level security;



alter table admins

enable row level security;



/*
=========================================================
PART 2 END
=========================================================
*/

/*
=========================================================
LIYAS Electronics
Database Structure

Part 3

Includes:
- Row Level Security Policies
- Access Rules
- Initial Product Data
- Final Database Setup

=========================================================
*/


/*
=========================================================
PRODUCT PUBLIC ACCESS

Products website par dikhane ke liye
=========================================================
*/


create policy "Public can view active products"

on products

for select

using (

    status = 'ACTIVE'

);



/*
=========================================================
WARRANTY PUBLIC CHECK

Customer serial number se warranty check kar sake

=========================================================
*/


create policy "Public can check warranty"

on warranties

for select

using (

    true

);



/*
=========================================================
DEALER ACCESS

Dealer apne records dekh sake

=========================================================
*/


create policy "Dealer view own warranties"

on warranties

for select

using (

    dealer_id IN (

        select id

        from dealers

        where user_id = auth.uid()

    )

);



/*
=========================================================
DEALER PROFILE ACCESS

=========================================================
*/


create policy "Dealer view own profile"

on dealers

for select

using (

    user_id = auth.uid()

);



/*
=========================================================
ADMIN ACCESS

=========================================================
*/


create policy "Admin full warranty access"

on warranties

for all

using (

    exists (

        select 1

        from admins

        where admins.user_id = auth.uid()

    )

);



create policy "Admin full dealer access"

on dealers

for all

using (

    exists (

        select 1

        from admins

        where admins.user_id = auth.uid()

    )

);



create policy "Admin full product access"

on products

for all

using (

    exists (

        select 1

        from admins

        where admins.user_id = auth.uid()

    )

);



/*
=========================================================
SUPPORT TICKET ACCESS

=========================================================
*/


create policy "Customer create support ticket"

on support_tickets

for insert

with check (

    true

);



create policy "Admin manage support tickets"

on support_tickets

for all

using (

    exists (

        select 1

        from admins

        where admins.user_id = auth.uid()

    )

);



/*
=========================================================
SAMPLE PRODUCTS

LIYAS Product Catalog

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

'LY-TV32',

'LIYAS 32 Inch Smart LED TV',

'LED TV',

'LY32S01',

12,

'Premium Smart LED TV designed for Indian homes'

),



(

'LY-LB09',

'LIYAS 9W LED Bulb',

'LED Lighting',

'LYLB09',

24,

'Energy efficient LED bulb'

),



(

'LY-STB01',

'LIYAS MPEG Set Top Box',

'Set Top Box',

'LYSTB01',

12,

'Reliable digital television receiver'

)

on conflict

(product_code)

do nothing;



/*
=========================================================
UPDATED TIMESTAMP FUNCTION

=========================================================
*/


create or replace function update_timestamp()

returns trigger

language plpgsql

as $$

begin

    new.updated_at = now();

    return new;

end;

$$;



/*
=========================================================
SUPPORT TICKET AUTO UPDATE

=========================================================
*/


create trigger update_support_ticket_time

before update

on support_tickets

for each row

execute procedure update_timestamp();



/*
=========================================================
FINAL DATABASE READY

LIYAS CARE DATABASE v1.0

=========================================================
*/
