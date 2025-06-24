export default {
    App: {
        baseUrl: "http://localhost:3000",
        notFoundUrl: "http://localhost:5173/not-found",
        db: {
            mongo: {
                uri: "mongodb://root:example@localhost:27017/urlShortener?authSource=admin",
                db: "urlShortener"
            }
        }
    }
}
