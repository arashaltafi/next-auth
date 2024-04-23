export async function GET() {
    return Response.json({ message: 'Api Route Not Found!' }, { status: 200 })
}

export async function POST() {
    return Response.json({ message: 'Api Route Not Found!' }, { status: 200 })
}

export async function DELETE() {
    return Response.json({ message: 'Api Route Not Found!' }, { status: 200 })
}

export async function PUT() {
    return Response.json({ message: 'Api Route Not Found!' }, { status: 200 })
}

export async function PATCH() {
    return Response.json({ message: 'Api Route Not Found!' }, { status: 200 })
}

export async function UPDATE() {
    return Response.json({ message: 'Api Route Not Found!' }, { status: 200 })
}

//// register ->
// get username, password, name, family
// create hash password
// generate token and save to cookie
// save (username, hashPass, token, userAgent)

//// login ->
// get username, password and userAgent from header
// query to get hashPassword with username
// check password is valid with hashPassword
// generate token and save to cookie
// update (token, userAgent)

//// other api ->
// token and userAgent in header
// check token is valid
// if = check userAgent and token is existed -> continue
// else = 401