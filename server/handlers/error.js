function errorHandler(error, request, response, next){
    return response.status(error.status || 500).json({
        error: {
            message: error.message || "Toss a coin to your developer, something went wrong"
        }
    });
}

module.exports = errorHandler;