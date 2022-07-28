const express = require('express');
const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const firebaseAdmin = require('firebase-admin');
const path = require('path');

const app = express();

app.use(cors());
app.use('/', express.static(path.join(__dirname, 'dist')));

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_API_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}`,
    algorithms: ['RS256']
});


const serviceAccount = require('./firebase/firebase-key.json');

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});

app.get('/firebase', jwtCheck, async (req, res) => {
    const { sub: uid } = req.user;
    try {
        const firebaseToken = await firebaseAdmin.auth().createCustomToken(uid);
        res.json(firebaseToken);
    } catch (err) {
        res.statusCode(500).send({
            error: err
        });
    };
});

app.listen(3001, () => console.log('running on port 3001'));