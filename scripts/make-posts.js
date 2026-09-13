import { faker } from "@faker-js/faker";
import path from "path";
import fs from "fs/promises";

function randTitle() {
    return faker.lorem.sentence();
}

function randContent() {
    return faker.lorem.paragraphs(3);
}

function randDate() {
    return faker.date.past().toISOString();
}

function randAuthor() {
    return faker.person.fullName();
}

function randId() {
    return faker.string.uuid();
}

function randImage() {
    return faker.image.urlPicsumPhotos({ width: 800, height: 600 });
}

async function makePosts() {
    const postsCount = 10;
    const posts = [];
    
    for (let i = 0; i < postsCount; i++) {
        const post = {
            id: randId(),
            title: randTitle(),
            content: randContent(),
            date: randDate(),
            author: randAuthor(),
            cover: randImage()
        };
        posts.push(post);
    }
    
    const file = path.join(process.cwd(), "db", "posts.json");
    await fs.writeFile(file, JSON.stringify(posts, null, 2));
}

makePosts().then(() => {
    console.log("Posts created successfully.");
}).catch((err) => {
    console.error(err);
    process.exit(1);
});
