import { createUserZSchema } from "../../src/models/users";

const validUser = {
    email: 'john.doe@example.com',
    password: 'SecurePassword123'
}

describe('Test User Validation', () => {
    it('should pass for the following valid data', () => {

        expect(() => createUserZSchema.parse(
            validUser)).not.toThrow();
    });

    it('should fail for not being email', () => {

        expect(() =>  createUserZSchema.parse(
            { ...validUser, "email": 'not a email' })).toThrow();
    });

    it('should fail for the missing password ', () => {

        expect(() => createUserZSchema.parse(
            { ...validUser, "password": undefined })).toThrow();
    });

    it("Should fail for there being no email", () => {

        expect(() => createUserZSchema.parse(
            {...validUser, "email": undefined })).toThrow();
    });
});