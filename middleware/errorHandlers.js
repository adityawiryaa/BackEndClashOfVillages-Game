const errorHandling = (err, req, res, next) => {
    let code;
    let name = err.name;
    let message;

    console.log(err)
    switch (name) {
        case 'ALREADY_EXIST':
            code = 409;
            message = 'Email Already Exist!';
            break;
        case 'DONT_HAVE_ACCESS':
            code = 403;
            message = 'You dont have access!'
            break;
        case 'LOGIN_FAILED':
            code = 404;
            message = 'Incorrect Email or Password!!'
            break;
        case 'NOT_FOUND':
            code = 404;
            message = 'User Not Found!'
            break;
        case 'AUTH_FAILED':
            code = 500;
            message = 'Incorrect ID or Token!!'
            break;
        case 'RESOURCE_LESS':
            code = 500;
            message = 'gold or food Less'
            break;
        case 'BUILD_FAILED':
            code = 500;
            message = 'Failed to build!!'
            break;
        case 'BARRACK_FAILED':
            code = 500;
            message = 'Max Barrack is 30'
            break;
        case 'SOLDIER_ENEMY_LESS':
            code = 500;
            message = 'Not Fair !! Enemy Soldier Less OR You Send Soldier invalid because better Resource Soldier '
            break;

        default:
            code = 500;
            message = 'Internal server error';
            break;
    }
    res.status(code).send({ success: false, message })
}
module.exports = errorHandling; 