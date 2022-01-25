interface IPost {
	userId: number;
	id: number;
	title: string;
	body: string;
}

const getPosts = async (): Promise<IPost[]> => {
	return fetch("https://jsonplaceholder.typicode.com/posts").then((response) =>
		response.json()
	);
};

const appendToDOM = async () => {
	const posts = await getPosts();
	const body = document.querySelector('body');
	posts.forEach((post) => {
		const div = document.createElement('div');
		div.innerHTML = post.body;

		body?.append(div);
	});
};

appendToDOM();
