export const  API = { 
    auth: {
        login: "https://cargo-transportation.onrender.com/auth/login",
        registaration: "https://cargo-transportation.onrender.com/auth/registration",
        activation: "https://cargo-transportation.onrender.com/auth/activate",
        logout: "https://cargo-transportation.onrender.com/auth/logout",
        profile: "https://cargo-transportation.onrender.com/auth/profile/",
        editProfile: "https://cargo-transportation.onrender.com/auth/profile/edit"
    },
    cargo: {
        list: "https://cargo-transportation.onrender.com/cargo/getList",
        create: "https://cargo-transportation.onrender.com/cargo/create",
        userCargos: "https://cargo-transportation.onrender.com/cargo/getUserCargos",
        cargoById: "https://cargo-transportation.onrender.com/cargo/",
        editCargo: "https://cargo-transportation.onrender.com/cargo/edit/"   
    },
    cars: {
        create: "https://cargo-transportation.onrender.com/cars/create",
        list: "https://cargo-transportation.onrender.com/cars/getList",
        userCargos: "https://cargo-transportation.onrender.com/cars/getUserCars",
        carById: "https://cargo-transportation.onrender.com/cars/",
        editCar : "https://cargo-transportation.onrender.com/cars/edit/"
    }
}