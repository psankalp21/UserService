export interface signupPayload {
    first_name: string,
    last_name?: string,
    email: string,
    password: string,
    dob: string,
    phone: string,
    about?: string
}