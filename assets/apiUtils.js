export const parseApiErrors = (error) => {
    return error.response.body.violations.reduce(
        (parsedErrors, violation) => {
            parsedErrors[violation['propertyPath']] = violation['message'];
            return parsedErrors;
        }, 
        {}
    )
}

const canWriteBlogPostRoles = ['ROLE_WRITER, ROLE_ADMIN', 'ROLE_SUPERADMIN'];

export const canWriteBlogPost = (userData) => {
    return userData !== null && userData.roles.some(
        userRoles => canWriteBlogPostRoles.includes(userRoles)
    )
}