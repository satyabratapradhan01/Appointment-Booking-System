
export const validator = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({success: false, message: result.error.flatten()})
    }

    req.validatorData = result.data;
    next(); 
};
