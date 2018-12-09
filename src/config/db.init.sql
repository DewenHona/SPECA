create database speca;
use speca

create table if not exists components (
    c_id int auto_increment primary key,
    c_name varchar(20) not null
);

insert into components values(1,'processor');
insert into components values(2,'motherboard');
insert into components values(3,'memory');
insert into components values(4,'graphics_card');
insert into components values(5,'storage');
insert into components values(6,'power_supply');
insert into components values(7,'case');
insert into components values(8,'cooling_solution');
insert into components values(9,'display');









