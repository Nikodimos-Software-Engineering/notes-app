import rateLimit from "../config/upstash";



const rateLimiter = async (req, res, next) => {
    try {
        const {success} = await rateLimit.limit("my-limit-key");

        if(!success){
            return res.status(429).json({message: "Too Many Requests, please tryagain later!"});
        }

        next()
    } catch (error) {
        console.error("Rate Limit Error: ", error)
        next(error);
    }
}


export default rateLimiter;