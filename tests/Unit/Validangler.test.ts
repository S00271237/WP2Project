import { createAnglerZSchema } from "../../src/models/anglers";

const validAngler = {
    user: '670a1f3c9d1e4b0012a1b001',
    name: 'David'
}

describe('Test Angler Validation', () => {
    it('should pass for the following valid data', () => {

        expect(() => createAnglerZSchema.parse(
            validAngler)).not.toThrow();
    });

    it('should fail for the user not being a valid id', () => {

        expect(() => createAnglerZSchema.parse(
            { ...validAngler, "user": 'not-an-id' })).toThrow();
    });

    it('should fail for there being no user', () => {

        expect(() => createAnglerZSchema.parse(
            { ...validAngler, "user": undefined })).toThrow();
    });

    it('should fail for there being no name', () => {

        expect(() => createAnglerZSchema.parse(
            { ...validAngler, "name": undefined })).toThrow();
    });

    it('should fail for the name being too short', () => {

        expect(() => createAnglerZSchema.parse(
            { ...validAngler, "name": 'D' })).toThrow();
    });

    it('should fail for the name being too long', () => {

        expect(() => createAnglerZSchema.parse(
            { ...validAngler, "name": 'a'.repeat(51) })).toThrow();
    });
        it('should trim whitespace from the name', () => {

        const result = createAnglerZSchema.parse(
            { ...validAngler, "name": '  David  ' });
        expect(result.name).toBe('David');
    });

    it('should pass for a name exactly 50 characters long', () => {

        expect(() => createAnglerZSchema.parse(
            { ...validAngler, "name": 'a'.repeat(50) })).not.toThrow();
    });
});