module.exports = {
    routes : [
        {
            method: 'POST',
            path: '/total',
            handler: 'venta.getTTotal',
            confing: {
                auth: false
            }
        }
    ]
}