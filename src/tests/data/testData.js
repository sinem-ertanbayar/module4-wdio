export const generateTestUser = () => ({
    firstName: 'Test',
    lastName: 'User',
    email: `testuser${Date.now()}@example.com`,
    password: 'Test@1234',
    address: '123 Test Street',
    city: 'Test City',
    state: 'Test State',
    country: 'US',
    postcode: '12345',
    phone: '1234567890',
    dob: '1990-01-01'
});

export const existingUser = {
    email: 'customer@practicesoftwaretesting.com',
    password: 'welcome01'
};

export const invalidCredentials = {
    email: 'customer@practicesoftwaretesting.com',
    password: 'wrongpassword123'
};

export const searchData = {
    validProduct: 'Pliers',
    invalidProduct: 'NonExistentProduct12345'
};

export const profileUpdateData = {
    firstName: 'UpdatedName',
    lastName: 'UpdatedLastName'
};

export const languages = {
    german: 'de',
    french: 'fr',
    spanish: 'es',
    english: 'en'
};

export default {
    generateTestUser,
    existingUser,
    invalidCredentials,
    searchData,
    profileUpdateData,
    languages
};
