import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Magic Transporter",
            version: "1.0.0",
            description:
                "Welcome to Magic Transporters, the future of moving things easily. These super cool transporters, powered by virtual magic, are here to make shipping stuff a breeze."
        },
        servers:[
            {
            url:"http://127.0.0.1:3000"
            }
        ]
    },
    apis: ["./src/routes/*.ts", "./src/controllers/*.ts"]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
