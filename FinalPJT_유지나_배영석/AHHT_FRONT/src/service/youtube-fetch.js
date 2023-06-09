class YoutubeFetch {
  constructor(key) {
    this.key = key;
    this.getRequestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
  }


  search(query) {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&q=${query}&type=video&key=${this.key}`;
    return fetch(searchUrl)
      .then((response) => response.json())
      .then((result) =>
        result.items.map((item) => ({
          ...item,
          id: item.id.videoId,
        })),
      );
  }
}

export default Youtube;
