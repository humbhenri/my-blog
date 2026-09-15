import { JsonPostRepository } from ".";
import {describe, expect, it} from '@jest/globals';

describe("JSON Post Repository", () => {
    it("should return an array of posts", async () => {
        // Arrange
        const repository = new JsonPostRepository();

        // Act
        const posts = await repository.findAllPublished();

        // Assert
        expect(posts).toBeInstanceOf(Array);
        expect(posts.length).toBeGreaterThan(0);
    });
});