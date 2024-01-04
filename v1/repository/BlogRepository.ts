
const repo = async () => {
    const getAllBlogPosts = async () => {
        try {
            return [];

        } catch(err: any) {
            throw(err);
        }
    }

    const getBlogPostByTitle = async (title: string) => {
        try {
            return {
                title: "test",
                author: "Me",
                keywords: [],
                markdown: "",
                html: "<p>Test blog post.</p>",
                created: "",
                updated: "",
            };

        } catch(err: any) {
            throw(err);
        }
    }

    return {
        getAllBlogPosts,
        getBlogPostByTitle,
    }
};

export default { repo };
