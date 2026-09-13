import { postRepository } from "@/repositories/posts";

export async function PostsList() {
    const posts = await postRepository.findAll();

    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <div key={post.id} className="p-4 border rounded shadow-sm">
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <p className="text-gray-600">{post.content}</p>
                    <p className="text-sm text-gray-500">
                        By {post.author} on {new Date(post.date).toLocaleDateString()}
                    </p>
                </div>
            ))}
        </div>
    );
}