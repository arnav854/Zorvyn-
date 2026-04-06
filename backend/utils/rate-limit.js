import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 3 * 60 * 1000, 
    max: 21, 
    message: "Too many requests, try again later"
});

export default limiter;