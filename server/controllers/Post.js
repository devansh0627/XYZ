const numItemsToGenerate = 20; //how many gallery items you want on the screen
const imageWidth = 480; //your desired image width in pixels
const imageHeight = 480; //desired image height in pixels
const collectionID = 1163637; //the collection ID from the original url

function fetchImage() {
  return fetch(`https://source.unsplash.com/collection/${collectionID}/${imageWidth}x${imageHeight}/`)
    .then(response => response.url);
}

async function generateDummyPosts() {
  const dummy_posts = [];

  for (let i = 0; i < numItemsToGenerate; i++) {
    const imageUrl = await fetchImage();
    dummy_posts.push({
      id: i + 1,
      title: `Post ${i + 1}`,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      author: "John Doe",
      date: "2024-05-05",
      imageUrl: imageUrl
    });
  }

  return dummy_posts;
}

exports.getPosts = async (req, res) => {
  try {
    const dummy_posts = await generateDummyPosts();
    return res.status(200).json({ data: dummy_posts });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
