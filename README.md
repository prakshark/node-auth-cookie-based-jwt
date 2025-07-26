
# JWT authentication and authorization using Cookie Storage

This is the skeleton code about how to implement the JWT based authentication for login and authorization for protected routes using Authorization cookies.

# Flow
- The entry point is the index.js
- To register a user, the username and password are derieved from ```req.body```, and after some basic checks, the user is added to the mongoDB database.
- To login a user, the user with a similar username is derieved from the database. The password is verified using bcrypt. If the password is verified, the a token is created using the username and _id using and the secret key using the  ```jwt.sign```. That token is stored into the header using ```res.cookie("cookieName", token, 
        { maxAge: 900000, httpOnly: true }
    )```.
- When trying to use the protectRoute middleware to only allow the authorized users to access the route, then we access the token from the header using the 
```
const currCookie = req.cookies.AccessControlCookie;
const verifiedRequest = jwt.verify(currCookie, mysecretkey);
if(verifiedRequest) {
    next();
}
```
- If the decoded value is legitimate, then we call ```next()```.
