export interface Application {
    id: String,
    firstname: String,
    lastname: String,
    tel: String,
    email: String,
    address: [
        {street: String,
        city: String,
        county: String,
        zip: String}
    ],
    experience: String,
    bio: String
}
