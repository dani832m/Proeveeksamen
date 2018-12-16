var express = require('express');
var router = express.Router();

// Inkluderer database og angiver port til forbindelse
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/*
  1. Komplet liste over konti i databasen indsat i HTML-tabel
*/
router.get('/', function (req, res, next) { // Route handler på roden
  MongoClient.connect(url, function (err, db) { // Connecter til db via MongoClient
    if (err) throw err; // Viser fejlbesked, hvis der opstår error
    var dbo = db.db("eksamen"); // Henviser til databasens navn
    dbo.collection("bec-bank").find({}).toArray(function (err, result) {
      if (err) throw err;
      var obj = {}; // Nyt objekt uden indhold
      obj.title = 'BEC Bank | Tabel over alle konti i systemet';
      obj.konti = result; // Angiver, at respons fra db skal tilføjes objektet
      res.render('konti', obj);
      db.close(); // Lukker forbindelse til database
    });
  });
});

/*
  2. Komplet liste over alle konti vist som array i JSON-format (GET request)
*/
router.get('/json', function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("eksamen");
    dbo.collection("bec-bank").find({}).toArray(function (err, result) {
      if (err) throw err;
      var obj = {};
      obj.konti = result;
      res.json(obj); // Her fortæller vi, at den skal render indholdet af objektet som JSON
      console.log("Komplet liste over alle konti vises som JSON.");
      db.close();
    });
  });
});

/*
  3. Opretter en ny bruger i databasen (POST request)
*/
router.post('/post', function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("eksamen");
    var konto = {};
    // Kobler de nye keys med brugerindtastningen
    konto.Uid = req.body.Uid;
    konto.medarbejder = req.body.medarbejder;
    konto.kunde = req.body.kunde;
    konto.fuldenavn = req.body.fuldenavn;
    konto.kodeord = req.body.kodeord;
    dbo.collection("bec-bank").insertOne(konto, function (err, res) {
      if (err) throw err;
      console.log("Bruger blev tilføjet til den valgte collection.");
      db.close();
    });
    // Videresender til den samlede oversigt
    res.redirect("/konti");
  });
});

/*
  4. Fjerner en specifik bruger/konto fra databasen (DELETE request)
*/
router.post('/delete/:Uid', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("eksamen");
    var Uid = req.params.Uid;
    dbo.collection("bec-bank").deleteOne({Uid}, function (err, res) {
      if (err) throw err;
      console.log("Konto/bruger blev fjernet fra den valgte collection.");
      db.close();
    });
    res.redirect("/konti");
  });
});

/*
  5. Redigerer en specifik bruger/konto fra databasen (PUT Request)
*/
router.post('/put', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("eksamen");
    var Uid = req.body.UidPUT;
    var oldValues = { Uid: Uid };
    var newValues = { $set: {Uid: req.body.UidPUT, medarbejder: req.body.medarbejderPUT, kunde: req.body.kundePUT, fuldenavn: req.body.fuldenavnPUT, kontonummer: req.body.kontonummerPUT, kontonavn: req.body.kontonavnPUT, saldo: req.body.saldoPUT, rente: req.body.rentePUT, kodeord: req.body.kodeordPUT} };
    dbo.collection("bec-bank").updateOne(oldValues, newValues, function (err, res) {
      if (err) throw err;
      console.log("Data for den specifikke bruger/konto er nu ændret.");
      db.close();
    });
    res.redirect("/konti");
  });
});

module.exports = router;