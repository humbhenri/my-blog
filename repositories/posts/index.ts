import { Post } from "@/models/posts";
import path from "path";
import fs from "fs/promises";

export interface PostRepository {
    findAll(): Promise<Post[]>;
}

export class JsonPostRepository implements PostRepository {

    async findAll(): Promise<Post[]> {
        const file = path.join(process.cwd(), "db", "posts.json");
        const data = await fs.readFile(file, "utf-8");
        return JSON.parse(data) as Post[];
    }
    
}