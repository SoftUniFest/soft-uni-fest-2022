import admin from 'firebase-admin';
// import serviceAccountKey  from './serviceAccountKey.json';

const serviceAccountKey = {
    type: 'service_account',
    project_id: 'softunifest',
    private_key_id: '048efe4844c4e23c7de11f7ddea15b49275c5ea0',
    private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC34GRt4kDD+Y97\nrhZ/jaOwFy8exAsb2zUei1D6pK31hF6o0acVcJQMxkEXIb7l+kf9RPneQ94vo20V\nIy9EqDhXulpvp14lKqUBFylKts0h3z9+6HbXQAaxnrXCIKWn3ETqCF+KIqxbDVqo\nkptanxkudfIxP8FwVj38mL4WBVUVpuTJOeBjZABQk0Yl+nlye/QPiZ+NyzgzREW/\nBLFzjslwWWm6ZvNu2EWS5VcTyKBevRxcHqtSJkoFUsrB8cpDyYSwnLyX/yhSJvRK\n2lD7NyIBr1A8hQpZE3qdPp42hjBopywYHOp5mst4wowusqLT58k5z4nDRk1MPRrH\nPB84fbf9AgMBAAECggEAI6N6C6Mv3twKn5PnF+tdt8ZSk3G3XnuO8N/bPu02q1Cv\n4SQbcIgcpdoyKPfZLm1jURcyn84DLTQNcyyZ34KEQxqjJyNnF6iLiSnSTsEeAqvo\nvGH1kLQ/5+LFQz49JUsHz112mQkt40r0EJqzwi12fb8OBVYgWbPZeVEofI+lhVe6\nYEdDnH2+b6C6RYDKeuINEWLWyH43Lqiyarx5xnis0R2/3SimAPV1lVNVrZeKNSmY\njKFQRnF4JOY8ej1417hFXg/xDsE54/gikIS1TNIPtgfrA7cen+db9884kN4QTnYo\nmVcTo52bY3HVFJSL5/NHradtGgipER5Rq/Hes+ZfqQKBgQDuyJ0hTyQcDttXX7a0\nZPIaLSMljPRDgajjQji5jlGA2xChhyuW5Jm5qWzSbfg9ynaMPszk2838Hyz/iBMI\nYzjxk3K1PzUJaj3h8MxgyK93e6tHH44tAekKxcUvFIMFxgfH4FgQqO89+WXV/Nva\n2QvXBJZ3oDu/BFmecBT+6o+wyQKBgQDFIlJpMrmnJxOmb/wNaXhMTKS9GVoVbmlG\niQ1wJl4kyfmxhhbieceBsXmLwivT0J2Iao1OiAFB/ui8KqE4gmNl3eE0hdzyU5jo\nqQrNjqlK0h/Y2hdHxddeviRh0HtudnS+nPp0o3wyLI92ugvv+Gqy3ts1fNY0N6rB\ntb1FFHG7lQKBgCpd1eNPE20XBbve85/WOU6Dq7TB6aUAoGKSIVZq9fMS60R9ozJG\npS/X68L6WA0+mwIPMnN4vHd7YJSGJDpcwIG8U6Hs8RAWlZw9CUYy1U8x1hXsd2Fs\n8VhD9tR/oy+nD0Jbf8SU9L3ePj9Vefy+fedMnRXkjDU8JFqEMHV6ULxhAoGBAJIJ\nmQ+BmnMvyajU8N5msc2kQa4sp8WUo7yzLxdT9Q4/6hAPC8j++kMj3K0iTSF/PBSh\nCsmQi43+bx9mXUTlowkF1B36xPFn6LEC+ZPKCbP58cnN1s0+zQvMxFsJ/UaZzmaf\nGBNsQUdSJ32G2e0OFM0pty7qqizIyGD0Z6BTQuX5AoGAXNWIihqbzPR31xlkcer5\n4qrwUld13uy448Pxb6F1OZIcGpGqXrGbZc/9rAqbsLQoTYPoHbl/puljBjEqq+Yz\nVlZcwBFHzIrAYSJmKUjs/1JyMZsy//Tu+wlR9xQk+TMJusmKskncEclBMPXwQ6HF\nPQLcEYsHNSDYKXYJK9QXNxY=\n-----END PRIVATE KEY-----\n',
    client_email: 'firebase-adminsdk-y1av3@softunifest.iam.gserviceaccount.com',
    client_id: '103689453564915156471',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
        'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-y1av3%40softunifest.iam.gserviceaccount.com',
};

export default admin;
export const firebaseConfig = (server) => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccountKey),
    });
};
