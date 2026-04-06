import rateLimit from "express-rate-limit";

export const authlimiter = rateLimit({
    windowMs: 3 * 60 * 1000, 
    max: 11, 
    message: {
        "message" : "Too many requests, try again later" ,
        statusCode : 429,
        success : false,
    }
});
export const apiLimiter = rateLimit({
    windowMs: 3 * 60 * 1000, 
    max: 51, 
    message: {
        "message" : "Too many requests, try again later" ,
        statusCode : 429,
        success : false,
    }
});

