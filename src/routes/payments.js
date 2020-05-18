var enviroment = require('./enviroment.js');
var express = require('express');
var router = express.Router();

// create customer
router.post('/stripe/create', function(req, res, next) {
    const stripe = require('stripe')(enviroment.stripe_key);
    var email = req.body['email'];
    var name = req.body['name'];

    stripe.customers.create({
        email: email,
        name : name
    })
    .then(customer => {
        res.send({
            status : `success`,
            id : customer.id
        });
    })
    .catch(error => {
        res.send({
            status : `error:${error}`
        });
    });
});

//create card
router.post('/stripe/create_card', function(req, res, next) {
    const stripe = require('stripe')(enviroment.stripe_key);
    var customerId = req.body['customerId'];
    var token = req.body['token'];

    stripe.customers.createSource(
        customerId,
        {source: token},
        function(err, card) {
            if(err) {
                res.send({
                    error : `${JSON.stringify(err)}`
                });
            } else {
                res.send({
                    status : `${JSON.stringify(card)}`
                });
            }
        }
    );
});

//get cards
router.post('/stripe/get_cards', function(req, res, next) {
    const stripe = require('stripe')(enviroment.stripe_key);
    var customerId = req.body['customerId'];

    stripe.customers.listSources(
        customerId,
        {object: 'card', limit: 3},
        function(err, cards) {
            if(err) {
                res.send({
                    error : `${JSON.stringify(err)}`
                });
            } else {
                res.send({
                    status : `${JSON.stringify(cards)}`
                });
            }
        }
    );

});

//create product

//create sku

//update product

//update sku

// pay customers's order
router.post('/stripe/charge', function(req, res, next) {

    const stripe = require('stripe')(enviroment.stripe_key);
    var cardId = req.body['cardId'];
    var customerId = req.body['customerId'];


    stripe.orders.create(
        {
          currency: 'usd',
          customer: customerId,
          email: 'hossam@example.com',
          items: [
            {type: 'sku', parent: 'sku_HB0MqyNyzlE6Wp'},
          ],
        },
        function(err, order) {
          if(err) {
            res.send({
                error1 : `${JSON.stringify(err)}`
            });
          } else {
            const order_id = order.id;
            stripe.orders.pay(
                order_id,
                {source: cardId, customer:customerId},
                function(err, order) {
                    if(err) {
                        res.send({
                            error2 : `${JSON.stringify(err)}`
                        });
                    } else {
                        res.send({
                            status : `${JSON.stringify(order)}`
                        });
                    }
                }
              );
          }
        }
    );
});



router.post('/tco/charge', function(req, res, next) {

    var Twocheckout = require('2checkout-node');

    var name = req.body['name'];
    var country = req.body['country'];
    var city = req.body['city'];
    var email = req.body['email'];
    var phone = req.body['phone'];
    var price = req.body['price'];

    console.log(price);

    var tco = new Twocheckout({
        secretWord: enviroment.twoCheckout.secretWord,
        sellerId: enviroment.twoCheckout.sellerId,         // Seller ID, required for all non Admin API bindings 
        privateKey: enviroment.twoCheckout.Private,     // Payment API private key, required for checkout.authorize binding
        demo: true,  
        sandbox: true                          // Uses 2Checkout sandbox URL for all bindings
    });

    const params = {
        "merchantOrderId": "129",
        "token": req.body.token,
        "currency": "USD",
        "total": price,
        "billingAddr": {
            "name": name,
            "addrLine1": "123 Test St",
            "city": "Columbus",
            "state": "Ohio",
            "zipCode": "43123",
            "country": "USA",
            "email": email,
            "phoneNumber": phone
        }
    };
  
    tco.checkout.authorize(params, function (error, data) {
        if (error) {
            res.send({error : error.message});
        } else {
            res.send({sucess : data.response.responseMsg});
        }
    });



});







module.exports = router;