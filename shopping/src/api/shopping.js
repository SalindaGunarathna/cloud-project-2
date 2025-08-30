const ShoppingService = require("../services/shopping-service");
const { PublishCustomerEvent, SubscribeMessage } = require("../utils");
const UserAuth = require('./middlewares/auth');
const { CUSTOMER_SERVICE } = require('../config');
const { PublishMessage } = require('../utils');

module.exports = (app, channel) => {
    const service = new ShoppingService();

    // Subscribe to events
    SubscribeMessage(channel, service);

    // Place order
    app.post('/order', UserAuth, async (req, res, next) => {
        const { _id } = req.user;
        const { txnNumber } = req.body;

        const { data } = await service.PlaceOrder({ _id, txnNumber });

        const payload = await service.GetOrderPayload(_id, data, 'CREATE_ORDER');
        PublishMessage(channel, CUSTOMER_SERVICE, JSON.stringify(payload));

        res.status(200).json(data);
    });

    // Get all orders
    app.get('/orders', UserAuth, async (req, res, next) => {
        const { _id } = req.user;
        const { data } = await service.GetOrders(_id);
        res.status(200).json(data);
    });

    // Add to cart
    app.put('/cart', UserAuth, async (req, res, next) => {
        const { _id } = req.user;
        const { product, qty } = req.body;
        const { data } = await service.ManageCart(
            _id,
            product,
            qty,
            false
        );
        res.status(200).json(data);
    });

    // Remove from cart
    app.delete('/cart/:id', UserAuth, async (req, res, next) => {
        const { _id } = req.user;
        const productId = req.params.id;
        const { data } = await service.ManageCart(
            _id,
            productId,
            1,
            true
        );
        res.status(200).json(data);
    });

    // Get cart
    app.get('/cart', UserAuth, async (req, res, next) => {
        const { _id } = req.user;
        const { data } = await service.GetCart({ _id });
        return res.status(200).json(data);
    });

    app.get('/whoami', (req, res, next) => {
        return res.status(200).json({ msg: '/shopping : I am Shopping Service' });
    });
};
