const express = require("express");
const mongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const multer  = require("multer")
const fileUpload = require('express-fileupload');

const app = express();
app.set("view engine", "hbs");
app.use(fileUpload());
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const domain = "localhost";
const port = "27017";
const mongodbUrl = `mongodb://${domain}:${port}/`;
handleDisconnect();
/*** Запросы
CRUD на изображения. (х4)
ВСЕ (мои) изображения (х2)
Регистрация
Авторизация.
8 запросов
 **/

app.use("/image/:id", function (request, response) {
	if(!request.body) return response.sendStatus(400);
	mongoClient.connect(mongodbUrl, { useNewUrlParser: true }, function(err, client) {   
		const db = client.db("gallery");
		db.collection("images").findOne({"_id": objectId(id)}, function(err, result) {
			client.close();
			response.json(result);
		});
	});
});

app.use("/add-image/:id", function (request, response) {
	if(!request.body) return response.sendStatus(400);
	mongoClient.connect(mongodbUrl, { useNewUrlParser: true }, function(err, client) {   
		const db = client.db("gallery");
		db.collection("images").insertOne(dataItem, function(err, result) {
			if(err) return console.log(err);
			client.close();
			response.json(result.insertedId);
		});
	});
});

app.use("/put-image/:id", function (request, response) {
	if(!request.body) return response.sendStatus(400);
	mongoClient.connect(mongodbUrl, { useNewUrlParser: true }, function(err, client) {   
		const db = client.db("gallery");
		db.collection("images").updateOne({"_id": objectId(id)}, dataItem, function(err, result) {
			client.close();
			return result;
		});
	});
});

app.use("/delete-image/:id", function (request, response) {
	if(!request.body) return response.sendStatus(400);
	mongoClient.connect(mongodbUrl, { useNewUrlParser: true }, function(err, client) {   
		const db = client.db("gallery");
		db.collection("images").deleteOne({"_id": objectId(id)}, function(err, result) {
			client.close();
			return result;
		});
	});
});


app.use("/images/:id", function (request, response) {
	if(!request.body) return response.sendStatus(400);
	mongoClient.connect(mongodbUrl, { useNewUrlParser: true }, function(err, client) {   
		const db = client.db("gallery");
		db.collection("images").find().toArray(function(err, results) {
			client.close();
			response.json(results);
		});
	});
});

app.use("/images-my/", function (request, response) {
	if(!request.body) return response.sendStatus(400);
	mongoClient.connect(mongodbUrl, { useNewUrlParser: true }, function(err, client) {   
		const db = client.db("gallery");
		db.collection("images").find().toArray(function(err, results) {
			client.close();
			response.json(results);
		});
	});
});


app.use("/enter/:id", function (request, response) {
	if(!request.body) return response.sendStatus(400);
	mongoClient.connect(mongodbUrl, { useNewUrlParser: true }, function(err, client) {   
		const db = client.db("gallery");
		db.collection("images").insertOne(dataItem, function(err, result) {
			if(err) return console.log(err);
			client.close();
			response.json(result.insertedId);
		});
	});
});

app.use("/exit/", function (request, response) {
	if(!request.body) return response.sendStatus(400);
	mongoClient.connect(mongodbUrl, { useNewUrlParser: true }, function(err, client) {   
		const db = client.db("gallery");
		db.collection("images").insertOne(dataItem, function(err, result) {
			if(err) return console.log(err);
			client.close();
			response.json(result.insertedId);
		});
	});
});

app.use("/registr/", function (request, response) {
	if(!request.body) return response.sendStatus(400);
	mongoClient.connect(mongodbUrl, { useNewUrlParser: true }, function(err, client) {   
		const db = client.db("gallery");
		db.collection("images").insertOne(dataItem, function(err, result) {
			if(err) return console.log(err);
			client.close();
			response.json(result.insertedId);
		});
	});
});

["/", "/get-persons", "/get-skills", "/get-effects", "/get-damages", "/get-person/:id"].map( (router) => {
	app.use(router, function (request, response) {
	  response.sendFile(__dirname + "/index.html");
	});
})

app.listen(8080);

