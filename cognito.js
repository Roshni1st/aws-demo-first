const AmazonCognitoId = require('amazon-cognito-identity-js')
const aws = require('aws-sdk')
const request = require('request')
const jwkToPem = require('jwk-to-pem')
const jwt = require('jsonwebtoken')

const poolData = {
    UserPoolId : "ap-south-1_3xMr4D5Sx",
    ClientId:"1krn3c6qs294ka28orfrsqduca"
}
const aws_region = 'ap-south-1'
const CognitoUserPool = AmazonCognitoId.CognitoUserPool
const userPool = new AmazonCognitoId.CognitoUserPool(poolData)

//Register new User
exports.signup = (name, email, password) => {
    return new Promise((resolve, reject) => {
        try {
            const attributeList = [];

            attributeList.push(
                new AmazonCognitoId.CognitoUserAttribute({
                    Name: 'name',
                    Value: name
                })
            );
            attributeList.push(
                new AmazonCognitoId.CognitoUserAttribute({
                    Name: 'email',
                    Value: email
                })
            );

            userPool.signUp(email, password, attributeList, null, (err, data) => {
                if (err) {
                    console.error("Cognito SignUp Error:", err);
                    reject(err);
                } else {
                    console.log("Cognito SignUp Success:", data);
                    resolve(data);
                }
            });
        } catch (e) {
            console.error("Unexpected Error:", e.message);
            reject(e);
        }
    });
};



