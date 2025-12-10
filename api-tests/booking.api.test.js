import request from 'supertest';
import assert from 'assert';

const BASE_URL = 'https://restful-booker.herokuapp.com';

describe('Restful Booker API Tests', () => {
    let token;
    let bookingId;

    const bookingData = {
        firstname: 'John',
        lastname: 'Doe',
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
            checkin: '2024-01-01',
            checkout: '2024-01-10'
        },
        additionalneeds: 'Breakfast'
    };

    const updatedBookingData = {
        firstname: 'Jane',
        lastname: 'Smith',
        totalprice: 200,
        depositpaid: false,
        bookingdates: {
            checkin: '2024-02-01',
            checkout: '2024-02-15'
        },
        additionalneeds: 'Lunch'
    };

    describe('POST /auth - Create Token', () => {
        it('should create an authentication token', async () => {
            const response = await request(BASE_URL)
                .post('/auth')
                .set('Content-Type', 'application/json')
                .send({
                    username: 'admin',
                    password: 'password123'
                });

            assert.strictEqual(response.status, 200, 'Status code should be 200');

            assert.ok(response.headers['content-type'].includes('application/json'), 
                'Content-Type header should be application/json');

            assert.ok(response.body.token, 'Response should contain a token');
            assert.strictEqual(typeof response.body.token, 'string', 'Token should be a string');

            token = response.body.token;
            console.log('Token created:', token);
        });
    });

    describe('POST /booking - Create Booking', () => {
        it('should create a new booking', async () => {
            const response = await request(BASE_URL)
                .post('/booking')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send(bookingData);

            assert.strictEqual(response.status, 200, 'Status code should be 200');

            assert.ok(response.headers['content-type'].includes('application/json'), 
                'Content-Type header should be application/json');

            assert.ok(response.body.bookingid, 'Response should contain a bookingid');
            assert.strictEqual(typeof response.body.bookingid, 'number', 'Booking ID should be a number');
            assert.ok(response.body.booking, 'Response should contain booking details');
            assert.strictEqual(response.body.booking.firstname, bookingData.firstname, 
                'Firstname should match');
            assert.strictEqual(response.body.booking.lastname, bookingData.lastname, 
                'Lastname should match');
            assert.strictEqual(response.body.booking.totalprice, bookingData.totalprice, 
                'Total price should match');
            assert.strictEqual(response.body.booking.depositpaid, bookingData.depositpaid, 
                'Deposit paid should match');
            assert.strictEqual(response.body.booking.additionalneeds, bookingData.additionalneeds, 
                'Additional needs should match');
            assert.deepStrictEqual(response.body.booking.bookingdates, bookingData.bookingdates, 
                'Booking dates should match');

            bookingId = response.body.bookingid;
            console.log('Booking created with ID:', bookingId);
        });
    });

    describe('GET /booking/:id - Get Booking by ID', () => {
        it('should get booking by ID', async () => {
            const response = await request(BASE_URL)
                .get(`/booking/${bookingId}`)
                .set('Accept', 'application/json');

            assert.strictEqual(response.status, 200, 'Status code should be 200');

            assert.ok(response.headers['content-type'].includes('application/json'), 
                'Content-Type header should be application/json');

            assert.strictEqual(response.body.firstname, bookingData.firstname, 
                'Firstname should match original booking');
            assert.strictEqual(response.body.lastname, bookingData.lastname, 
                'Lastname should match original booking');
            assert.strictEqual(response.body.totalprice, bookingData.totalprice, 
                'Total price should match original booking');
            assert.strictEqual(response.body.depositpaid, bookingData.depositpaid, 
                'Deposit paid should match original booking');
            assert.strictEqual(response.body.additionalneeds, bookingData.additionalneeds, 
                'Additional needs should match original booking');
        });

        it('should return 404 for non-existent booking', async () => {
            const response = await request(BASE_URL)
                .get('/booking/999999999')
                .set('Accept', 'application/json');

            assert.strictEqual(response.status, 404, 'Status code should be 404 for non-existent booking');
        });
    });

    describe('PUT /booking/:id - Update Booking', () => {
        it('should update an existing booking', async () => {
            const response = await request(BASE_URL)
                .put(`/booking/${bookingId}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Cookie', `token=${token}`)
                .send(updatedBookingData);

            assert.strictEqual(response.status, 200, 'Status code should be 200');

            assert.ok(response.headers['content-type'].includes('application/json'), 
                'Content-Type header should be application/json');

            assert.strictEqual(response.body.firstname, updatedBookingData.firstname, 
                'Firstname should be updated');
            assert.strictEqual(response.body.lastname, updatedBookingData.lastname, 
                'Lastname should be updated');
            assert.strictEqual(response.body.totalprice, updatedBookingData.totalprice, 
                'Total price should be updated');
            assert.strictEqual(response.body.depositpaid, updatedBookingData.depositpaid, 
                'Deposit paid should be updated');
            assert.strictEqual(response.body.additionalneeds, updatedBookingData.additionalneeds, 
                'Additional needs should be updated');
            assert.deepStrictEqual(response.body.bookingdates, updatedBookingData.bookingdates, 
                'Booking dates should be updated');
        });

        it('should verify booking was updated by fetching it', async () => {
            const response = await request(BASE_URL)
                .get(`/booking/${bookingId}`)
                .set('Accept', 'application/json');

            assert.strictEqual(response.status, 200, 'Status code should be 200');

            assert.strictEqual(response.body.firstname, updatedBookingData.firstname, 
                'Updated firstname should persist');
            assert.strictEqual(response.body.lastname, updatedBookingData.lastname, 
                'Updated lastname should persist');
        });
    });

    describe('DELETE /booking/:id - Delete Booking', () => {
        it('should delete an existing booking', async () => {
            const response = await request(BASE_URL)
                .delete(`/booking/${bookingId}`)
                .set('Cookie', `token=${token}`);

            assert.strictEqual(response.status, 201, 'Status code should be 201 for successful deletion');

            assert.ok(response.headers['content-type'], 'Response should have Content-Type header');
        });

        it('should verify booking was deleted', async () => {
            const response = await request(BASE_URL)
                .get(`/booking/${bookingId}`)
                .set('Accept', 'application/json');

            assert.strictEqual(response.status, 404, 
                'Status code should be 404 after booking is deleted');
        });
    });
});
