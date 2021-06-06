

exports.successMessage =(response,statusCode,data)=>{
    return response.status(statusCode).json({status:true,data:data})
}
exports.errorMessage =(response,statusCode,message)=>{
    return response.status(statusCode).json({status:false,message:message})
}