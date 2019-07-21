CREATE DATABASE Chat;

USE Chat;

CREATE TABLE Chats (
    ID INT NOT NULL AUTO_INCREMENT,
    Username varchar (200) NOT NULL,
    Text varchar (200) NOT NULL,
    PRIMARY KEY (ID)
);