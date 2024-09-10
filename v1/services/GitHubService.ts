import axios from "axios";

export async function renderHtml(markdown: string): Promise<string | void> {
    const endpoint = "https://api.github.com/markdown";
    const body = { text: markdown };

    const ghRes: Promise<string | void> = await axios.post(endpoint, body)
        .then((res) => {
            if (res.status == 200) {
                return res.data;
            } else {
                throw (new Error("Error rendering mardown"));
            }
        }).catch((err) => {
            console.error(err);
        });

    return ghRes;
}
